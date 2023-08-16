
import { Box, Alert } from '@mui/material';
import { AuthLayout } from "@/components/layouts/AuthLayout";

import { getSession } from "next-auth/react";
import { GetServerSideProps, NextPage } from 'next';

const ConfirmPage = () => {

    return (
        <AuthLayout title={"¡ Correo Enviado ! "} pageDescription={'Envío de correo electrónico de confirmación '} >
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
