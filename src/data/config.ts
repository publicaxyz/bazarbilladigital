const env = import.meta.env;

function envOr(value: string | undefined, fallback: string): string {
  return value && value.trim() !== "" ? value.trim() : fallback;
}

export const WA_NUMBER = envOr(env.PUBLIC_WA_NUMBER, "584240000000");

export const SITE_URL  = envOr(env.PUBLIC_SITE_URL,  "https://tudominio.com");
export const SITE_NAME = envOr(env.PUBLIC_SITE_NAME, "Tu Tienda Streaming");

export const SITE_LOGO        = envOr(env.PUBLIC_SITE_LOGO,        "Streaming");
export const SITE_LOGO_ACCENT = envOr(env.PUBLIC_SITE_LOGO_ACCENT, "Elite");

export const COLOR_ACCENT  = envOr(env.PUBLIC_COLOR_ACCENT,  "#f0245f");
export const COLOR_ACCENT2 = envOr(env.PUBLIC_COLOR_ACCENT2, "#a78bfa");
export const COLOR_BLUE    = envOr(env.PUBLIC_COLOR_BLUE,    "#60a5fa");
export const COLOR_GREEN   = envOr(env.PUBLIC_COLOR_GREEN,   "#4ade80");

export function waUrl(message: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Multimoneda ──
// Interruptor maestro: si es "false", el sitio queda solo en USD y no se
// muestra ningún selector de moneda, sin importar PUBLIC_CURRENCIES.
export const MULTICURRENCY_ENABLED = envOr(env.PUBLIC_MULTICURRENCY_ENABLED, "true") === "true";

// Lista de monedas activas además de USD, ej. "VES,COP". Cada código debe
// existir en CURRENCY_DEFS más abajo.
export const ACTIVE_CURRENCIES = envOr(env.PUBLIC_CURRENCIES, "VES")
  .split(",")
  .map((c) => c.trim().toUpperCase())
  .filter(Boolean);

export const DEFAULT_CURRENCY = envOr(env.PUBLIC_DEFAULT_CURRENCY, "VES").trim().toUpperCase();

// Si es "false", el toggle no ofrece volver a USD: solo se muestran las
// monedas listadas en PUBLIC_CURRENCIES (los precios quedan fijos en ellas).
export const ALLOW_USD_TOGGLE = envOr(env.PUBLIC_ALLOW_USD_TOGGLE, "true") === "true";

export const VES_RATES_API_URL = envOr(env.PUBLIC_VES_RATES_API_URL, "https://www.usdt.com.ve/api/v1/rates/current");
export const COP_RATES_API_URL = envOr(env.PUBLIC_COP_RATES_API_URL, "https://co.dolarapi.com/v1/trm");

export type CurrencyDef = {
  code: string;
  label: string;
  apiUrl: string;
  /** Extrae la tasa (unidades de la moneda por 1 USD) del JSON de la API. */
  parseRate: (json: any) => number | null;
  formatAmount: (amount: number) => string;
};

function isFiniteNumber(n: unknown): n is number {
  return typeof n === "number" && Number.isFinite(n);
}

export const CURRENCY_DEFS: Record<string, CurrencyDef> = {
  VES: {
    code: "VES",
    label: "Bs",
    apiUrl: VES_RATES_API_URL,
    parseRate: (json) => {
      const rate = json?.data?.binance?.buy_rate;
      return isFiniteNumber(rate) && rate > 0 ? rate : null;
    },
    formatAmount: (amount) => `Bs ${amount.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
  },
  COP: {
    code: "COP",
    label: "COP",
    apiUrl: COP_RATES_API_URL,
    parseRate: (json) => {
      const rate = json?.valor;
      return isFiniteNumber(rate) && rate > 0 ? rate : null;
    },
    formatAmount: (amount) => `$${amount.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} COP`,
  },
};
