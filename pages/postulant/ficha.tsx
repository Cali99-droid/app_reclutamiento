import { prisma } from '@/server/db/client';

import { apiCon, reclutApi } from "@/api";
import AnnouncementForm from "@/components/jobs/AnnouncementForm";
import { AdminLayout } from "@/components/layouts";

import { IGrado } from "@/interfaces";
import { Box, Button, Typography } from '@mui/material';
import { convocatoria } from "@prisma/client";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from 'next-auth/react';



interface Props {
    postulante: any

}


const fichaPage: NextPage<Props> = ({ postulante }) => {
    return (
        <AdminLayout title={"Postulante "} subTitle={"Datos del postulante"}>
            <Box className="fadeIn" display={'flex'} gap={2}>
                <Typography>Nombres:</Typography>
                <Typography>{postulante.persona.nombres + postulante.persona.apellido_pat + postulante.persona.apellido_mat}</Typography>



            </Box>
            <Box>
                <Button color='info'>Evaluar</Button>
            </Box>


        </AdminLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });
    const { user } = session;
    const post = await prisma.postulante.findUnique({
        where: {
            id: parseInt(user.id)
        },
        include: {
            persona: true
        }
    })
    const postulante = JSON.parse(JSON.stringify(post))

    return {
        props: {
            postulante

        }
    }
}


export default fichaPage