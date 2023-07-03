import { Html, Head, Main, NextScript } from 'next/document'
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
      </body>
    </Html>
  )
}
