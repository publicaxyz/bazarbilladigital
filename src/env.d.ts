/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WA_NUMBER?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_SITE_NAME?: string;
  readonly PUBLIC_SITE_LOGO?: string;
  readonly PUBLIC_SITE_LOGO_ACCENT?: string;
  readonly PUBLIC_COLOR_ACCENT?: string;
  readonly PUBLIC_COLOR_ACCENT2?: string;
  readonly PUBLIC_COLOR_BLUE?: string;
  readonly PUBLIC_COLOR_GREEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
