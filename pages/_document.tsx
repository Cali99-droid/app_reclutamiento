/* eslint-disable @next/next/no-img-element */

import { AuthContext } from '@/context'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'
import { useContext } from 'react'

export default function Document() {


  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/logo.ico" /> {/* Cambia la ruta si tu favicon se llama de forma diferente */}
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@200;300;400;500&display=swap" rel="stylesheet" />


        <noscript>
          <img height="1" width="1" alt='pixel' style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1332356400685254&ev=PageView&noscript=1"
          />
        </noscript>

        <Script async src="/pixel.js" />
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
      </Head>
      <body >
        <Main />
        <NextScript />
        <script src="/mautic.js" async defer />


      </body>
    </Html>
  )
}
