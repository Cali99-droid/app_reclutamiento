
import { Box, Button, Grid, TextField, Link, Chip, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { getProviders, getSession, signIn } from "next-auth/react";
import { validations } from '@/helpers';
import { GetServerSideProps } from 'next';
import GoogleIcon from '@mui/icons-material/Google';
type FormData = {
    email   : string,
    password: string,
};


const LoginPage =()=> {

    const router = useRouter();
   

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [ showError, setShowError ] = useState(false);

    const [providers, setProviders] = useState<any>({})
    useEffect(() => {
        getProviders().then(prov=>{
          setProviders(prov)
        }) 
      }, [])


    const onLoginUser = async( { email, password }: FormData ) => {
        setShowError(false);
        await signIn('credentials', {email,password});
    }

  return (
    <AuthLayout title={"Iniciar Sesion "} >
                <Chip 
                label="No reconocemos ese usuario / contraseña"
                color="error"
                icon={ <ErrorOutline /> }
                className="fadeIn"
                sx={{ display: showError ? 'flex': 'none' }}
                />
        <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, }} >
                <Grid container spacing={2}>
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
                                    Ingresar
                                </Button>
                            </Grid>   
                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>  
                                <Box >
                                    <Typography> ¿No tienes una cuenta? <NextLink passHref legacyBehavior
                                        type="submit"
                                        color="secondary" 
                                        href={ router.query.p ? `/auth/register?p=${ router.query.p }`: '/auth/register' }                                
                                    
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
                            <Grid item xs={12} display='flex' justifyContent='end' flexDirection={'column'}>
                            <Divider sx={{width:'100%', mb:2}} />
                            {
                                Object.values(providers).map((provider:any)=>{
                                    if(provider.id === 'credentials') return (<div key={'credentials'}></div>)
                                    return(
                                        <Button
                                        key={provider.id}
                                        variant='outlined'
                                        fullWidth
                                        size='medium'
                                        startIcon={ <GoogleIcon/>}
                                        onClick={()=>signIn(provider.id)}
                                        >
                                           Entrar con {provider.name}
                                        </Button>
                                    )
                                })
                            }
                        
                        </Grid>      
                </Grid>     
                </Box>
        </form>
    </AuthLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req,query}) => {
    const session = await getSession({req});

    const {p = '/'} = query;
    if(session){
        return {
            redirect:{
                destination:p.toString(),
                permanent:false
            }
        }
    }

    return {
        props: {    
        }
    }
}



export default LoginPage 
