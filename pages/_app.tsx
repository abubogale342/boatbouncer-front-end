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
import React from "react";
import ErrorBoundary from "@/components/error";

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
}: AppProps<{ session: Session }>) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
  );

  return (
    <SessionProvider session={session}>
      <RWBProvider>
        <Provider store={store}>
          <Elements stripe={stripePromise}>
            <ErrorBoundary>
              <div className={`${cx(sfPro.variable, inter.variable)}`}>
                <Component {...pageProps} />
              </div>
            </ErrorBoundary>
          </Elements>
        </Provider>
      </RWBProvider>
      <Analytics />
    </SessionProvider>
  );
}
