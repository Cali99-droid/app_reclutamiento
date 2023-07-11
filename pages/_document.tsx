import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/logo.ico" /> {/* Cambia la ruta si tu favicon se llama de forma diferente */}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />

      </Head>
      <body >
        <Main />
        <NextScript />
        <script src="/mautic.js" async defer />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-RTHN6CE091" />
        <Script strategy="lazyOnload" id='ganty'>
          {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
        </Script>

      </body>
    </Html>
  )
}
