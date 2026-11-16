export const CHECKOUT_LINKS = {
  basic: "https://pay.kiwify.com.br/kit-basico-atividades",
  premium: "https://pay.kiwify.com.br/kit-premium-atividades",
  premiumDownsell: "https://pay.kiwify.com.br/kit-premium-oferta-especial",
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
