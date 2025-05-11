/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

import * as pixel from '@/lib/fpixel';

type FacebookPixelProps = {
  trackEvent: (event: string, options?: Record<string, unknown>) => void;
  isLoaded: boolean;
};

const FacebookPixelContext = createContext<FacebookPixelProps>({
  trackEvent: () => {},
  isLoaded: false,
});

const FacebookPixelProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoaded) return;

    console.log('pageview');
    pixel.pageview();
  }, [pathname, isLoaded]);

  const trackEvent = (event: string, options?: Record<string, unknown>) => {
    if (!isLoaded) return;
    pixel.event(event, options);
  };

  return (
    <FacebookPixelContext.Provider value={{ trackEvent, isLoaded }}>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setIsLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixel.FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
      {children}
    </FacebookPixelContext.Provider>
  );
};

export function useFacebookPixel() {
  const context = useContext(FacebookPixelContext);
  if (!context) {
    throw new Error(
      'useFacebookPixel must be used within a FacebookPixelProvider'
    );
  }

  return context;
}

export default FacebookPixelProvider;
