import { AuthProvider, UiProvider, DatosProvider } from '@/context'
import { SessionProvider, useSession } from "next-auth/react"
import '@/styles/globals.css'
import { lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { PostProvider } from '../context';
import { SWRConfig } from 'swr'



export default function App({ Component, pageProps }: AppProps) {


  return (
    <SessionProvider >
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
    </SessionProvider>



  )



}
