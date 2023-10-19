import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { Provider } from "react-redux";
import cx from "classnames";
import localFont from "@next/font/local";
import { Inter } from "@next/font/google";
import { store } from "@/components/shared/store";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import ErrorBoundary from "@/components/error";
import { MapContext } from "features/context/mapContext";
import mapboxgl from "mapbox-gl";

const sfPro = localFont({
  src: "../styles/SF-Pro-Display-Medium.otf",
  variable: "--font-sf",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

if (!process.browser) React.useLayoutEffect = React.useEffect;

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  );

  return (
    <SessionProvider session={pageProps.session}>
      <RWBProvider>
        <Elements stripe={stripePromise}>
          <Provider store={store}>
            <ErrorBoundary>
              <MapContext.Provider value={{ map, setMap }}>
                <div
                  className={`${cx(
                    sfPro.variable,
                    inter.variable,
                  )} overflow-x-clip`}
                >
                  <Component {...pageProps} />
                </div>
              </MapContext.Provider>
            </ErrorBoundary>
          </Provider>
        </Elements>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
