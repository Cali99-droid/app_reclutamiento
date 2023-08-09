import { prisma } from '@/server/db/client';

import { AdminLayout, JobsLayout } from "@/components/layouts";


import { Alert, Box, Typography, } from '@mui/material';

import { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';



interface Props {
    doc: any

}


const postulantePage: NextPage<Props> = ({ doc }) => {

    return (
        <JobsLayout title={'Sesion'} pageDescription={'Previsualizar documento'} >

            <Box className="fadeIn" pt={18} width={'90%'} sx={{ margin: '0 auto' }}>
                <Box mb={4}>
                    <Typography variant="h2">Documento Subido</Typography>
                </Box>
                <object data={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc.session}`} type="application/pdf" width="100%" height="800px">
                    <Alert severity="warning">No agregó ningun documento</Alert>
                </object>



            </Box>



        </JobsLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {

    const { session } = query as { session: string }

    const ses: any = await getSession({ req });



    const { user } = ses;

    const persona = await prisma.persona.findUnique({
        where: {
            id: user.persona.id,
        },
        select: {
            id: true,
            postulante: {
                select: {
                    id: true
                },
            }

        }
    })
    if (persona?.postulante[0] === undefined) {
        //TODO redirigir a pantalla cuando no llenó sus datos
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }


    const doc = await prisma.postulante_x_convocatoria.findFirst({
        where: {
            id: parseInt(session)
            , AND: {
                postulante_id: persona?.postulante[0].id
            }
        },
        select: {
            session: true
        }
    })


    await prisma.$disconnect()

    if (!doc) {
        //TODO redirigir a pantalla cuando no llenó sus datos
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    return {
        props: {
            doc
        }
    }
}


export default postulantePage