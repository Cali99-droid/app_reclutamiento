import { prisma } from '@/server/db/client';
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


const ConfirmAccountPage = () => {

    const router = useRouter();




    return (
        <AuthLayout title={"Confirmar cuenta "} pageDescription={'Enlace de confirmación de cuenta, verificación de token de confirmación'} >



            <Box bgcolor={'#FFF'} padding={4} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
                <Alert variant="outlined" severity="success">
                    Tu cuenta ha sido confirmanda con éxito
                </Alert>
                <NextLink
                    passHref
                    legacyBehavior


                    href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}


                >
                    <Link color={'info'} style={{ textDecoration: 'underline' }}> Iniciar Sesion</Link>
                </NextLink>
            </Box>
        </AuthLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {


    const { token = '' } = query;
    const user = await prisma.user.findFirst({
        where: {
            token: token.toString(),
        }
    })
    if (user) {
        const us = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                token: '',
                confirmado: 1
            }

        })
        await prisma.$disconnect()
    } else {
        await prisma.$disconnect()
        console.log('invalid token')
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }

    }


    return {
        props: {
        }
    }
}



export default ConfirmAccountPage 
