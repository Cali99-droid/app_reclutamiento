import { AuthProvider, UiProvider, DatosProvider } from '@/context'
import { SessionProvider, signOut, useSession } from "next-auth/react"
import '@/styles/globals.css'
import { lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { PostProvider } from '../context';
import { SWRConfig } from 'swr'
import { useEffect, useRef } from 'react'
import { inactivity } from '@/helpers'
import { useRouter } from 'next/router'
import 'dayjs/locale/en-gb';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import "dayjs/locale/es";
export default function App({ Component, pageProps }: AppProps) {

  // const inactivityTimeout = 20 * 60 * 1000; // 20 minutos en milisegundos
  // const router = useRouter();
  // let inactivityTimer: number | any;

  // const resetTimer = () => {
  //   if (inactivityTimer) clearTimeout(inactivityTimer);
  //   inactivityTimer = setTimeout(() => {
  //     signOut();
  //     router.push('/'); // Redirigir a la página de inicio de sesión después del cierre de sesión
  //     alert('Su sesión ha expirado, inicie nuevamente')
  //   }, inactivityTimeout);
  // };

  // const handleInteraction = () => {
  //   resetTimer();
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleInteraction);
  //   document.addEventListener('mousedown', handleInteraction);
  //   document.addEventListener('keydown', handleInteraction);
  //   document.addEventListener('touchstart', handleInteraction);

  //   resetTimer();

  //   return () => {
  //     document.removeEventListener('mousemove', handleInteraction);
  //     document.removeEventListener('mousedown', handleInteraction);
  //     document.removeEventListener('keydown', handleInteraction);
  //     document.removeEventListener('touchstart', handleInteraction);
  //     if (inactivityTimer) clearTimeout(inactivityTimer);
  //   };

  // }, []);
  return (
    <SessionProvider >
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <SWRConfig
          value={{
            refreshInterval: 1000,
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
          <AuthProvider>

            <PostProvider>
              <DatosProvider >
                <UiProvider>

                  <ThemeProvider theme={lightTheme} >
                    <CssBaseline />
                    <Component {...pageProps} />
                  </ThemeProvider>
                </UiProvider>
              </DatosProvider>
            </PostProvider>
          </AuthProvider>
        </SWRConfig>
      </LocalizationProvider>

    </SessionProvider>



  )



}
