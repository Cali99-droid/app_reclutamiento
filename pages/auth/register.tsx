
import { Box, Button, Grid, TextField, Link } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';


type FormData = {
    nombre    : string;
    apellidoPat    : string;
    apellidoMat    : string;
    email   : string;
    password: string;
};


export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegisterForm = async( {  nombre, apellidoPat, apellidoMat, email, password }: FormData ) => {
        console.log('registrando',nombre, apellidoMat,apellidoPat, email, password)

    }
  return (
    <AuthLayout title={"Registrate y Postula "} >
        <Box sx={{ width: 350, }} >
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Nombres"
                                  variant="outlined"
                                  fullWidth 
                                  
                                  { ...register('nombre', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.nombre }
                                helperText={ errors.nombre?.message }
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Apellido Paterno"
                                  variant="outlined"
                                  fullWidth 
                                  { ...register('apellidoPat', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.apellidoPat }
                                helperText={ errors.apellidoPat?.message }
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  type="text"
                                  label="Apellido Materno"
                                  variant="outlined"
                                  fullWidth 
                                  { ...register('apellidoMat', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                                })}
                                error={ !!errors.apellidoMat }
                                helperText={ errors.apellidoMat?.message }
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                                  type="email"
                                  label="Correo"
                                  variant="outlined"
                                 
                                  fullWidth 
                                  { ...register('email', {
                                    required: 'Este campo es requerido',
                                    validate: validations.isEmail
                                })}
                                error={ !!errors.email }
                                helperText={ errors.email?.message }
                              />
  
                          </Grid>
                          <Grid item xs={12}>
                              <TextField
                             
                                  label="Contraseña"
                                  type='password'
                                  variant="outlined"
                                  fullWidth 
                                  { ...register('password', {
                                    required: 'Este campo es requerido',
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                })}
                                error={ !!errors.password }
                                helperText={ errors.password?.message }
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
            </form>   
        </Box>
    </AuthLayout>
  )
}
