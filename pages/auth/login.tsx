
import { Box, Button, Grid, TextField, Link, Chip, Divider, useMediaQuery, CircularProgress } from '@mui/material';
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
                                    Ingresar{loading && (
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
                                        <Link sx={{ fontWeight: 'bold', textDecoration: 'underline' }} color="secondary">Regístrate</Link>
                                    </NextLink>


                                </Box>

                                <Box textAlign={'end'}>
                                    <NextLink
                                        type="submit"
                                        color="secondary"
                                        href={"/auth/forgot-password"}
                                        passHref
                                        legacyBehavior>
                                        <Link sx={{ fontWeight: 'bold', textDecoration: 'underline' }} color="secondary">Olvidé mi contraseña</Link>
                                    </NextLink>

                                </Box>

                            </Grid>
                            <Grid item xs={12} display='flex' justifyContent='end' flexDirection={'column'}>
                                <Divider sx={{ width: '100%', mb: 2 }} />
                                {
                                    Object.values(providers).map((provider: any) => {
                                        if (provider.id === 'credentials') return (<div key={'credentials'}></div>)
                                        return (
                                            <Button
                                                key={provider.id}
                                                variant='outlined'
                                                fullWidth
                                                size='medium'
                                                startIcon={<GoogleIcon />}
                                                onClick={() => signIn(provider.id)}
                                            >{`Entrar con ${provider.name}`}
                                            </Button>
                                        )
                                    })
                                }

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
