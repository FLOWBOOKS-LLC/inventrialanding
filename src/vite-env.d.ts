/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Public Calendly event URL, e.g. https://calendly.com/your-org/30min */
  readonly VITE_CALENDLY_URL?: string;
  /** Inventria landing backend, e.g. http://localhost:4000 */
  readonly VITE_BACKEND_URL?: string;
  /** FlowBooks Connect (KYC) app, e.g. http://localhost:5174 */
  readonly VITE_KYC_URL?: string;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

