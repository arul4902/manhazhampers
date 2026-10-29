const RECENTLY_VIEWED_KEY = 'manhaz_recently_viewed_v1';
const MAX_RECENT = 6;

export function getRecentlyViewedIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENTLY_VIEWED_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addRecentlyViewedId(productId: string): void {
  try {
    const current = getRecentlyViewedIds();
    const filtered = current.filter((id) => id !== productId);
    const updated = [productId, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage quota or disabled localStorage errors
  }
}

export function getProductQueryParam(): string | null {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product');
  } catch {
    return null;
  }
}

export function setProductQueryParam(slugOrId: string | null): void {
  try {
    const url = new URL(window.location.href);
    if (slugOrId) {
      url.searchParams.set('product', slugOrId);
    } else {
      url.searchParams.delete('product');
    }
    window.history.replaceState({}, '', url.toString());
  } catch {
    // ignore
  }
}

