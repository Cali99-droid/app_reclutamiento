import { JobsLayout } from "@/components/layouts";


import { Box, Button, Grid, TextField, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';



export default function LoginPage() {
  return (
    <AuthLayout title={"Iniciar Sesion "} >
        <Box sx={{ width: 350, }} >
            <Grid container spacing={2}>
                          <Grid item xs={12}>
                              <TextField
                                  type="email"
                                  label="Correo"
                                  variant="outlined"
                                  fullWidth 
                                  required
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                             
                                  label="Contraseña"
                                  type='password'
                                  variant="outlined"
                                  fullWidth 
                                  required
                              />
                          </Grid>
  
                          <Grid item xs={12}>
                              <Button
                                  type="submit"
                                  color="secondary"
                                  
                                  size='large'
                                  fullWidth>
                                  Ingresar
                              </Button>
                          </Grid>   
                          <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>  
                              <Box >
                                <Typography> ¿No tienes una cuenta? <NextLink passHref legacyBehavior
                                    type="submit"
                                    color="secondary" 
                                    href={"/auth/register"}                               
                                  
                                    >
                                   <Link> Registrate</Link>
                                   </NextLink>
                                </Typography>
                                
                              </Box>

                              <Box textAlign={'end'}>
                                <NextLink 
                                    type="submit"
                                    color="secondary" 
                                    href={"/auth/forgot"}                               
                                    passHref
                                    legacyBehavior>
                                        <Link >Olvide mi contraseña
                                        </Link>
                                </NextLink>
                                
                              </Box>
                              
                          </Grid>          
              </Grid>     
        </Box>
    </AuthLayout>
  )
}
