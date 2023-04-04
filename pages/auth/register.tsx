
import { Box, Button, Grid, TextField, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';



export default function LoginPage() {
  return (
    <AuthLayout title={"Registrate y Postula "} >
        <Box sx={{ width: 350, }} >
            <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Nombres"
                                  variant="outlined"
                                  fullWidth 
                                  required
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Apellido Paterno"
                                  variant="outlined"
                                  fullWidth 
                                  required
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Apellido Materno"
                                  variant="outlined"
                                  fullWidth 
                                  required
                              />
  
                          </Grid>
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
                                  Registrarme
                              </Button>
                          </Grid>   
                          <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>  
                              <Box >
                                <Typography> ¿Ya tienes una cuenta? <NextLink passHref legacyBehavior
                                    type="submit"
                                    color="secondary" 
                                    href={"/auth/login"}                               
                                  
                                    >
                                   <Link> Iniciar Sesion</Link>
                                   </NextLink>
                                </Typography>
                                
                              </Box>

                              <Box textAlign={'right'}>
                                <NextLink
                                    type="submit"
                                    color="secondary" 
                                    href={"/auth/forget"}                               
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
