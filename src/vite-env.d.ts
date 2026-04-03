/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Calendly event URL, e.g. https://calendly.com/your-org/30min */
  readonly VITE_CALENDLY_URL?: string;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

