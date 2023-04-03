import { createTheme } from '@mui/material/styles';
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#F3F3F3',
    },
    secondary: {
      main: '#43655A',
    },
    info: {
      main: '#60807F'
    }
  },

  components: {
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color:'secondary',
        
       
      },
    },
    MuiAppBar: {
     
      defaultProps: {
        elevation:1,
        position: 'fixed',
      },
      styleOverrides: {
        root: {
          backgroundColor: '#F3F3F3',
          height: 80,
          justifyContent:'center'        
        },
      }
    },

    MuiTypography: {
      defaultProps: {
        fontFamily:'Raleway',
         color:'secondary'
      },
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
         
        },
        h2: {
          fontSize: 20,
          fontWeight: 400
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600
        },
        h6: {
         
          fontSize: 20,
          fontWeight: 400
        },
      }
    },


    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'small',
        disableElevation: true,
        color: 'info'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: 'rgba(96,128,127,0.6)',
            transition: 'all 0.3s ease-in-out',
        
          }
        }
      }
    },


    MuiCard: {
      defaultProps: {
        elevation: 0
      },
      styleOverrides: {
        root: {
          boxShadow: '0px 5px 5px rgba(0,0,0,0.05)',
          borderRadius: '10px',
        }
      }
    }
    
  }
});