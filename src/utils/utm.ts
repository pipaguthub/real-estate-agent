export const CHECKOUT_LINKS = {
  basic: "https://pay.cakto.com.br/366hkzt",
  premium: "https://pay.cakto.com.br/87iq2nh_1329336",
  premiumDownsell: "https://pay.cakto.com.br/xdhfndq",
} as const;

export function buildCheckoutUrl(baseUrl: string): string {
  if (typeof window === "undefined") {
    return baseUrl;
  }

  try {
    const currentParams = new URLSearchParams(window.location.search);
    if (Array.from(currentParams.keys()).length === 0) {
      return baseUrl;
    }

    const targetUrl = new URL(baseUrl);
    currentParams.forEach((value, key) => {
      if (!targetUrl.searchParams.has(key)) {
        targetUrl.searchParams.set(key, value);
      }
    });

    return targetUrl.toString();
  } catch {
    const query = window.location.search;
    if (!query) return baseUrl;
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}${query.replace(/^\?/, "")}`;
  }
}
