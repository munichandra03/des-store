import Script from "next/script";
import Footer from "@/components/footer/index";
import "../styles/globals.css";
import Header from "@/components/header/index";
import { data } from "../config/nav.config";
import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";
import usePageSignal from "@/utils/usePageSignal";
import useNewSession from "@/hooks/useNewSession";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <>
      {/* <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-2MKXLELW6R"
      strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-2MKXLELW6R');
      gtag('config', 'UA-223760903-1');
      
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start': new Date().getTime(), event: 'gtm.js'}); var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
          'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-MK7JMM3');
        `}
      </Script> */}
      <SessionProvider session={session}>
        <Provider store={store}>
          {router.pathname !== "/signin" ? <Header data={data} /> : null}
          <Head>
            <link rel="shortcut icon" href="favicon.png" />
          </Head>
          <Component {...pageProps} />
          <ToastContainer toastStyle={{ backgroundColor: "228B22" }} />
          {usePageSignal(router)}
          {/* {useNewSession()}  */}
          {router.pathname !== "/signin" ? <Footer /> : null}
        </Provider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
