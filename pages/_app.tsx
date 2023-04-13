import { AuthProvider, UiProvider } from '@/context'
import { SessionProvider } from "next-auth/react"
import '@/styles/globals.css'
import { lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { PostProvider } from '../context';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <SessionProvider >
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
    </SessionProvider>
    
    

  )
  
  
 
}
