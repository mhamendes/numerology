interface Window {
  fbq: (event: string, name: string, options?: Record<string, unknown>) => void;
}

window.fbq = window.fbq || {};
