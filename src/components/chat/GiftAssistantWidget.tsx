import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  X,
  Send,
  MessageCircle,
  RotateCcw,
  Minus,
  ChevronRight,
} from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';
import { productsData } from '../../data/products';
import {
  processCustomerMessage,
  ChatMessage,
  GuidedGiftState,
  ChatActionButton,
} from '../../utils/chatbotEngine';
import { queryAIGiftingAssistant } from '../../utils/aiService';
import { ProductSnippetCard } from './ProductSnippetCard';
import { copyToClipboard } from '../../utils/whatsapp';
import type { Product } from '../../types';

interface GiftAssistantWidgetProps {
  onShowToast?: (title: string, message?: string) => void;
  onOpenProductModal?: (product: Product) => void;
}

const INITIAL_SUGGESTIONS = [
  'Help me choose a gift',
  'Tell me about wedding seer',
  'Can I customize a hamper?',
  'How do I place an order?',
  'What gifts under ₹1500?',
  'Order epdi panradhu?',
  'Talk to team on WhatsApp',
];

export const GiftAssistantWidget: React.FC<GiftAssistantWidgetProps> = ({
  onShowToast,
  onOpenProductModal,
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Conversational state
  const [guidedState, setGuidedState] = useState<GuidedGiftState>({
    active: false,
    step: 'recipient',
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-msg',
      sender: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: "Hello! ✨ Welcome to **Manha’z Hampers & Plate Decor** in Salem.\n\nI am your automated Gift Assistant. I can help you choose the right gift, explore our traditional wedding seer collections, explain customization, and connect you with our studio team on WhatsApp.\n\nHow can I help make your celebration special today?",
      actionButtons: [
        { label: '✨ Help Me Choose a Gift', type: 'quick_reply', payload: 'Help me choose a gift' },
        { label: '💍 Wedding Seer Collections', type: 'category', payload: 'wedding-seer' },
        { label: '💰 Gifts Under ₹1,500', type: 'quick_reply', payload: 'What gifts can I get under ₹1500?' },
        { label: '💬 Order epdi panradhu?', type: 'quick_reply', payload: 'Order epdi panradhu?' },
      ],
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen, isMinimized, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized]);

  // Keyboard shortcut: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = useCallback(
    (textToSend?: string) => {
      const text = (textToSend || inputValue).trim();
      if (!text || isTyping) return;

      const userTimestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      const userMsg: ChatMessage = {
        id: `usr-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: userTimestamp,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsTyping(true);

      // Natural conversational typing delay (450ms - 750ms)
      setTimeout(async () => {
        try {
          const { message: botMsg, nextState } = await queryAIGiftingAssistant(text, guidedState);
          setGuidedState(nextState);
          setMessages((prev) => [...prev, botMsg]);
        } catch {
          const { message: fallbackMsg, nextState } = processCustomerMessage(text, guidedState);
          setGuidedState(nextState);
          setMessages((prev) => [...prev, fallbackMsg]);
        } finally {
          setIsTyping(false);
        }
      }, 550);
    },
    [inputValue, isTyping, guidedState]
  );

  const handleResetConversation = () => {
    setGuidedState({ active: false, step: 'recipient' });
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: "I’ve reset our chat! ✨ How may I assist your gifting plans today?",
        actionButtons: [
          { label: '✨ Help Me Choose a Gift', type: 'quick_reply', payload: 'Help me choose a gift' },
          { label: '💍 Wedding Seer Collections', type: 'category', payload: 'wedding-seer' },
          { label: '📦 How to Order?', type: 'quick_reply', payload: 'How do I place an order?' },
        ],
      },
    ]);
    if (onShowToast) {
      onShowToast('Chat reset', 'Started a fresh conversation.');
    }
  };

  const handleActionClick = (action: ChatActionButton) => {
    if (action.type === 'quick_reply' && action.payload) {
      handleSendMessage(action.payload);
    } else if (action.type === 'category') {
      if (action.payload === 'maps') {
        window.open(siteConfig.contact.googleMapsUrl, '_blank', 'noopener,noreferrer');
      } else {
        navigate(`/category/${action.payload || 'all'}`);
        setIsMinimized(true);
      }
    } else if (action.type === 'view_product' && action.payload) {
      const found = productsData.find((p) => p.slug === action.payload || p.id === action.payload);
      if (found) {
        if (onOpenProductModal) {
          onOpenProductModal(found);
        } else {
          navigate(`/product/${found.slug}`);
          setIsMinimized(true);
        }
      }
    } else if (action.type === 'whatsapp' && action.payload) {
      const encoded = encodeURIComponent(action.payload);
      const url = `https://wa.me/${siteConfig.contact.whatsappBusinessNumber}?text=${encoded}`;
      copyToClipboard(action.payload);
      window.open(url, '_blank', 'noopener,noreferrer');
      if (onShowToast) {
        onShowToast('Opening WhatsApp chat!', 'Your enquiry details were copied to clipboard.');
      }
    } else if (action.type === 'reset') {
      handleResetConversation();
    }
  };

  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      // Bold rendering for **text**
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className={line.trim() === '' ? 'h-2' : 'leading-relaxed'}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-burgundy-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING CHAT TRIGGER BUTTON                                           */}
      {/* ========================================================================= */}
      <div className="fixed bottom-5 right-20 sm:bottom-7 sm:right-24 z-30 flex items-center gap-2">
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
            }}
            className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-burgundy-900 hover:bg-burgundy-950 active:scale-95 text-ivory-50 shadow-luxury hover:shadow-2xl border border-gold-400/60 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/50"
            aria-label="Open Manha'z Gift Assistant"
            aria-expanded={isOpen}
            aria-haspopup="dialog"
          >
            <div className="w-6 h-6 rounded-full bg-burgundy-700 flex items-center justify-center text-gold-300 group-hover:rotate-12 transition-transform">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide pr-1">
              Gift Assistant
            </span>

            {/* Glowing gold dot */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-500 border border-white"></span>
            </span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. CHAT PANEL WINDOW                                                      */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          role="dialog"
          aria-labelledby="gift-assistant-title"
          aria-modal="false"
          className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[92vw] sm:w-[410px] bg-ivory-50 rounded-3xl shadow-2xl border border-gold-300/60 flex flex-col overflow-hidden transition-all duration-300 animate-dialog-content ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Top Bar Header */}
          <div className="p-3.5 sm:p-4 bg-burgundy-900 text-ivory-50 flex items-center justify-between border-b border-gold-400/40 relative z-10 flex-shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-burgundy-700 border border-gold-400/60 flex items-center justify-center text-gold-300 flex-shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3
                  id="gift-assistant-title"
                  className="font-serif text-sm sm:text-base font-bold text-white truncate flex items-center gap-1.5"
                >
                  <span>Manha’z Gift Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gold-300/90 font-light truncate">
                  Salem Boutique Guide • Automated AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Reset Conversation */}
              <button
                type="button"
                onClick={handleResetConversation}
                className="p-1.5 rounded-lg text-ivory-300 hover:text-white hover:bg-burgundy-800 transition"
                title="Reset conversation"
                aria-label="Restart chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Minimize Toggle */}
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-ivory-300 hover:text-white hover:bg-burgundy-800 transition"
                title={isMinimized ? 'Expand chat' : 'Minimize chat'}
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
              >
                <Minus className="w-4 h-4" />
              </button>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-ivory-300 hover:text-white hover:bg-burgundy-800 transition"
                title="Close chat"
                aria-label="Close assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Scrollable Message History Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-ivory-50/70" aria-live="polite">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-[13px] shadow-xs ${
                        msg.sender === 'user'
                          ? 'bg-burgundy-600 text-ivory-50 rounded-br-xs'
                          : 'bg-white text-espresso-900 border border-gold-300/40 rounded-bl-xs'
                      }`}
                    >
                      {msg.sender === 'assistant' ? (
                        <div className="space-y-1">{renderFormattedText(msg.text)}</div>
                      ) : (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      )}

                      <span
                        className={`block text-[9px] mt-1.5 font-light ${
                          msg.sender === 'user' ? 'text-ivory-200 text-right' : 'text-espresso-700/50'
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Attached Recommended Products (if any) */}
                    {msg.products && msg.products.length > 0 && (
                      <div className="w-full mt-2.5 space-y-2">
                        <span className="text-[10px] font-bold text-gold-600 uppercase tracking-wider block px-1">
                          Recommended Studio Creations ({msg.products.length})
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.products.map((product) => (
                            <ProductSnippetCard
                              key={product.id}
                              product={product}
                              onSelectProduct={onOpenProductModal}
                              onCloseChat={() => setIsMinimized(true)}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attached Action Pills / Follow-ups */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 max-w-[95%]">
                        {msg.actionButtons.map((btn, bIdx) => (
                          <button
                            key={bIdx}
                            type="button"
                            onClick={() => handleActionClick(btn)}
                            className={`py-1.5 px-3 rounded-full text-xs font-semibold transition flex items-center gap-1.5 shadow-xs ${
                              btn.type === 'whatsapp'
                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                                : 'bg-white hover:bg-rose-50 text-burgundy-900 border border-gold-300/80 hover:border-burgundy-600'
                            }`}
                          >
                            {btn.type === 'whatsapp' && <MessageCircle className="w-3 h-3 text-emerald-200" />}
                            <span>{btn.label}</span>
                            <ChevronRight className="w-3 h-3 text-gold-600 opacity-70" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-gold-300/40 w-fit shadow-xs">
                    <span className="text-[11px] text-espresso-700/60 font-medium">
                      Manha’z Assistant is typing
                    </span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy-600 animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-burgundy-800 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick-Start Suggestion Pills (Shown horizontally) */}
              <div className="px-3 py-2 bg-ivory-100 border-t border-espresso-100/70 overflow-x-auto flex gap-1.5 no-scrollbar flex-shrink-0">
                {INITIAL_SUGGESTIONS.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => handleSendMessage(sug)}
                    className="py-1 px-2.5 rounded-full bg-white hover:bg-rose-50 border border-gold-300/60 text-espresso-800 text-[11px] font-medium whitespace-nowrap transition shadow-2xs"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Message Input Footer */}
              <div className="p-3 bg-white border-t border-espresso-100 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      maxLength={400}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about gifts, budget, wedding seer, Tamil..."
                      className="w-full text-xs sm:text-sm bg-ivory-50 rounded-xl pl-3 pr-8 py-2.5 border border-espresso-200 text-espresso-900 placeholder:text-espresso-700/40 focus:outline-none focus:ring-2 focus:ring-burgundy-600 transition"
                      aria-label="Message Manha'z Gift Assistant"
                    />
                    {inputValue && (
                      <button
                        type="button"
                        onClick={() => setInputValue('')}
                        className="absolute right-2.5 top-2.5 text-espresso-400 hover:text-espresso-700 p-0.5"
                        aria-label="Clear input"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2.5 rounded-xl bg-burgundy-600 hover:bg-burgundy-700 active:bg-burgundy-800 text-ivory-50 disabled:opacity-40 transition shadow-sm flex items-center justify-center flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-burgundy-600"
                    title="Send message"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Micro Transparency Notice */}
                <p className="text-[10px] text-espresso-700/60 text-center mt-1.5 font-light">
                  Automated assistant • Final availability &amp; prices confirmed on WhatsApp
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
