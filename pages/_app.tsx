import { UiProvider } from '@/context'
import '@/styles/globals.css'
import { lightTheme } from '@/themes'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { PostProvider } from '../context';

export default function App({ Component, pageProps }: AppProps) {
  return(

   
      <PostProvider> 
        <UiProvider>
          <ThemeProvider theme={lightTheme} >
          <CssBaseline />
          <Component {...pageProps} />
          </ThemeProvider> 
        </UiProvider>
      </PostProvider>
        
   
    
    

  )
  
  
 
}
