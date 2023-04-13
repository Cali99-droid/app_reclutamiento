
import { Box, Button, Grid, TextField, Link, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { validations } from '@/helpers';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/';
import { ErrorOutline } from '@mui/icons-material';
import { signIn } from 'next-auth/react';


type FormData = {
    nombre    : string;
    apellidoPat    : string;
    apellidoMat    : string;
    email   : string;
    password: string;
};


export default function RegisterPage() {
    const { registerUser } = useContext( AuthContext );
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

 

    const [ showError, setShowError ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState('');

    const onRegisterForm = async( {  nombre, apellidoPat, apellidoMat, email, password }: FormData ) => {
        setShowError(false);
        const { hasError, message } = await registerUser( nombre, apellidoPat, apellidoMat, email, password );

        if ( hasError ) {
          setShowError(true);
          setErrorMessage( message! );
          setTimeout(() => setShowError(false), 3000);
          return;
        }


      //  Inicar session */
      await signIn('credentials', {email,password});

    }
  return (
    <AuthLayout title={"Registrate y Postula "} >
        <Box sx={{ width: 350, }} >
        <form onSubmit={ handleSubmit(onRegisterForm) } noValidate>
            <Chip 
                    label={errorMessage}
                    color="error"
                    icon={ <ErrorOutline /> }
                    className="fadeIn"
                    sx={{ display: showError ? 'flex': 'none' ,mb:4}}
                    
                />
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
