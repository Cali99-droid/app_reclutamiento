
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
import { GetServerSideProps } from 'next';
import GoogleIcon from '@mui/icons-material/Google';
import { AuthContext } from '@/context';
type FormData = {
    email: string,
    password: string,
};


const ConfirmPage = () => {

    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false);
    const { forgotPassword } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('');




    const onSubmitEmail = async ({ email }: FormData) => {
        setShowError(false);
        const { hasError, message } = await forgotPassword(email);

        if (hasError) {
            setShowError(true);
            setErrorMessage(message!);
            setTimeout(() => setShowError(false), 3000);
            return;
        }
        router.replace('/auth/confirm');
    }



    return (
        <AuthLayout title={"Para recuperar tu contraseña, ingresa tu correo  "} >

            <Box bgcolor={'#FFF'} padding={4} >
                <Typography>Ingresa tu correo</Typography>
                <form onSubmit={handleSubmit(onSubmitEmail)} noValidate>
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
        }
    }
}



export default ConfirmPage 
