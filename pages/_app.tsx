import { AuthProvider, UiProvider } from '@/context'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { PostProvider } from '../context';
import { SWRConfig } from 'swr'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider >
       <SWRConfig 
          value={{
           
            fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
          }}
        >
        <AuthProvider>
          <PostProvider> 
            <UiProvider>
              <ThemeProvider theme={lightTheme} >
              <CssBaseline />
              <Component {...pageProps} />
              </ThemeProvider> 
            </UiProvider>
          </PostProvider>
        </AuthProvider>  
      </SWRConfig>
    </SessionProvider>
    
    

  )
  
  
 
}
