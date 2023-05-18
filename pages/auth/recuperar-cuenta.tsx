
import { Box, Button, Grid, TextField, Link, Chip, Divider, Alert } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { ErrorOutline } from "@mui/icons-material";
import { getProviders, getSession, signIn } from "next-auth/react";
import { validations } from '@/helpers';
import { GetServerSideProps, NextPage } from 'next';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '@/context';
import { prisma } from '../../server/db/client';
type FormData = {
    email: string,
    password: string,
};
interface Props {


    token: string;
}

const RecuperarPage: NextPage<Props> = ({ token }) => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const { updatePassword } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('');


    const onSubmitPassword = async ({ password }: FormData) => {
        setShowError(false);
        const { hasError, message } = await updatePassword(password, token);
        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        alert('Contraseña actualizada correctamente')
        router.push('/auth/login')
    }



    return (
        <AuthLayout title={"Para recuperar tu contraseña, ingresa tu nueva contraseña "} >

            <Box bgcolor={'#FFF'} padding={4} >
                <Typography>Ingresa tu  nueva contraseña</Typography>
                <form onSubmit={handleSubmit(onSubmitPassword)} noValidate>
                    <Chip
                        label={errorMessage}
                        color="error"
                        icon={<ErrorOutline />}
                        className="fadeIn"
                        sx={{ display: showError ? 'flex' : 'none', mb: 4 }}

                    />
                    <Box sx={{ width: 350, }} >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
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

                                    size='large'
                                    fullWidth>
                                    Enviar
                                </Button>
                            </Grid>

                        </Grid>
                    </Box>
                </form>
            </Box>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

    const { token } = query;

    if (!token) {
        console.log('invalid token')
        return {

            redirect: {
                destination: '/',
                permanent: false
            }
        }

    }




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
        props: {

            token
        }
    }
}



export default RecuperarPage 
