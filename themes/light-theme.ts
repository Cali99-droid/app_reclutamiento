import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#eeca73',
      
    },
    secondary: {
      main: '#0045aa ', /**#005A34  #43655A  dorado: #EECA73  rojo:#ED1C24 Blanco:#DEDEDE Axul: 0045aa*/
    },
    info: {
      main: '#ed1c24',
    },

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
        position: 'absolute',
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
        color: 'secondary'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          boxShadow: 'none',
          borderRadius: 10,
          ":hover": {
            backgroundColor: '#4565D0',
            color:'#FFF',
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

  
},esES);