
import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/x-data-grid';
export let lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#eeca73',
      
    },
    secondary: {
      main: '#0045aa  ', /**#005A34  #43655A  dorado: #EECA73  rojo:#ED1C24 Blanco:#DEDEDE Axul: 0045aa*/
    },
    info: {
      main: '#001C75',
    },
  
   

  },
 

  components: {

   
    MuiLink: {
      defaultProps: {
        underline: 'none',
        color:'primary'
      
        
       
      },
    },
    MuiAppBar: {
     
      defaultProps: {
          elevation:0
      
      },
      styleOverrides: {
        root: {
          background:'#FFF' ,
          height: 90,
          justifyContent:'center'        
        },
      }
    },

    MuiTypography: {
      defaultProps: {
        fontFamily:'Raleway',
         color:'#001C75'
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
         fontFamily:'Raleway',
          borderRadius: 10,
         
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
              boxShadow: 'none',
          },
      },
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
    },
    
},
    
  }

);
