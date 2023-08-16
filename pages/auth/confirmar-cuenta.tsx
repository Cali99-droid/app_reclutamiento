import { prisma } from '@/server/db/client';
import { Box, Link, Alert } from '@mui/material';

import { AuthLayout } from "@/components/layouts/AuthLayout";
import NextLink from 'next/link';
import { useRouter } from "next/router";

import { GetServerSideProps, NextPage } from 'next';

interface Props {
    invalid: boolean
}
const ConfirmAccountPage: NextPage<Props> = ({ invalid }) => {

    const router = useRouter();
    return (
        <AuthLayout title={"Confirmar cuenta "} pageDescription={'Enlace de confirmación de cuenta, verificación de token de confirmación'} >
            <Box bgcolor={'#FFF'} padding={4} display={'flex'} flexDirection={'column'} alignItems={'center'} gap={3}>
                {invalid ? (
                    <Alert variant="outlined" severity="error">
                        Token Inválido
                    </Alert>
                ) : (
                    <Alert variant="outlined" severity="success">
                        Tu cuenta ha sido confirmanda con éxito
                    </Alert>
                )}

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

            // destination: '/auth/login',
            // permanent: false
            props: {
                invalid: true
            }

        }

    }


    return {
        props: {
            invalid: false
        }
    }
}



export default ConfirmAccountPage 
