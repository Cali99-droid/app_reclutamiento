
import { Box, Button, Grid, TextField, Link, Chip, Divider, useMediaQuery, CircularProgress, createSvgIcon } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { getProviders, getSession, signIn } from "next-auth/react";
import { validations } from '@/helpers';
import { GetServerSideProps } from 'next';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '@/context';
import { blue, green } from '@mui/material/colors';
type FormData = {
    email: string,
    password: string,
};


const LoginPage = (error: string) => {
    const matches = useMediaQuery('(min-width:600px)');
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);

    const { verificarConfirmacion, noConfirm } = useContext(AuthContext)
    const [providers, setProviders] = useState<any>({})
    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])



    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false);
        setLoading(true)
        const confirmado = await verificarConfirmacion(email);
        if (confirmado) {

            const resp = await signIn('credentials', { email, password, redirect: false, });
            if (resp) {

                setShowError(!resp.ok)
                setTimeout(() => setShowError(false), 3000);
                const destination = router.query.p?.toString() || '/';

                // console.log(resp.ok)
                if (resp.ok) {
                    router.push(destination)
                } else {
                    setLoading(false)
                }

            }
        } else {
            setLoading(false)
        }
    }

    const GoogleIconS = createSvgIcon(
        // credit: plus icon from https://heroicons.com/
        <svg xmlns="http://www.w3.org/2000/svg" width="2443" height="2500" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" id="google"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path></svg>,
        'google',
    );

    return (
        <AuthLayout title={"Iniciar Sesion "} pageDescription={'Iniciar sesión en la plataforma de empleos de la institución educativa Albert Einstein'} >

            <Box bgcolor={'#FFF'} padding={4} className={'fadeIn'}>
                <Chip
                    label={'La cuenta aún no ha sido confirmada, revisa tu email'}
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ display: noConfirm ? 'flex' : 'none', mb: 2 }}
                />
                <Chip
                    label={'Credenciales incorrectas'}
                    color="error"
                    icon={<ErrorOutline />}
                    className="fadeIn"
                    sx={{ display: showError ? 'flex' : 'none', mb: 2 }}
                />

                <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                    <Box >
                        <Grid container spacing={2}>
                            <Grid item xs={12} display='flex' justifyContent='end' flexDirection={'column'}>

                                {
                                    Object.values(providers).map((provider: any) => {
                                        if (provider.id === 'credentials') return (<div key={'credentials'}></div>)
                                        return (
                                            <Button
                                                key={provider.id}
                                                variant='outlined'
                                                fullWidth
                                                size='large'

                                                startIcon={<GoogleIconS />}
                                                onClick={() => signIn(provider.id)}
                                            >{`Entrar con ${provider.name}`}
                                            </Button>
                                        )
                                    })
                                }
                                <Divider sx={{ marginTop: 3, marginBottom: 2 }}><Typography fontSize={15}>O continua con tu email y contraseña</Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type="email"
                                    label="Correo"
                                    variant="outlined"
                                    fullWidth
                                    {...register('email', {
                                        required: 'Este campo es requerido',
                                        validate: validations.isEmail

                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    label="Contraseña"
                                    type='password'
                                    variant="outlined"
                                    fullWidth
                                    {...register('password', {
                                        required: 'Este campo es requerido',
                                        minLength: { value: 6, message: 'Mínimo 6 caracteres' }
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button

                                    type="submit"
                                    color="secondary"
                                    disabled={loading}
                                    size='large'
                                    fullWidth>
                                    Ingresar
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: blue[500],
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
                                <Box >
                                    <Typography>¿No tienes una cuenta?</Typography>
                                    <NextLink passHref legacyBehavior
                                        type="submit"


                                        href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}

                                    >
                                        <Link sx={{ textDecoration: 'underline' }} color="secondary">Regístrate</Link>
                                    </NextLink>


                                </Box>
                                <Box textAlign={'end'}>
                                    <NextLink
                                        type="submit"
                                        color="secondary"
                                        href={"/auth/forgot-password"}
                                        passHref
                                        legacyBehavior>
                                        <Link sx={{ textDecoration: 'underline' }} color="secondary">Olvidé mi contraseña</Link>
                                    </NextLink>

                                </Box>

                            </Grid>

                        </Grid>
                    </Box>
                </form>
            </Box>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    // let error = '';
    // const session = await getSession({ req });
    // if (query.error) {
    //     error = JSON.parse(JSON.stringify(query.error))
    //     console.log('error en path ')
    // }

    // const { p = '/' } = query;

    // if (session) {
    //     return {
    //         redirect: {
    //             destination: p.toString(),
    //             permanent: false
    //         }
    //     }
    // }


    // return {
    //     props: {}
    // }
    // console.log({session});

    const session = await getSession({ req });
    const { p = '/' } = query;

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }


    return {
        props: {}
    }
}



export default LoginPage 
