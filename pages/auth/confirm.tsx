
import { Box, Button, Grid, TextField, Link, Chip, Divider, Alert } from '@mui/material';
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
    email: string,
    password: string,
};


const ConfirmPage = () => {

    const router = useRouter();

    return (
        <AuthLayout title={"¡ Correo Enviado ! "} >

            <Box bgcolor={'#FFF'} padding={4} >
                <Alert variant="outlined" severity="success">
                    Te hemos enviado las instrucciones correo electrónico , revisa tu bandeja de entrada.
                </Alert>
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
