import { JobsLayout } from "@/components/layouts";
import { Navigation } from "@/components/postulants";
import { Box, Typography } from '@mui/material';
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { prisma } from '../server/db/client';


interface Props {
    postulante: any
    persona: any
    convocatorias: any[]
}

const MisDatosPage: NextPage<Props> = ({ postulante, convocatorias }) => {
    return (
        <JobsLayout title={"AE | Mis datos "} pageDescription={"mis datos"}>
            <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={15} >
                <Navigation postulante={postulante} convocatorias={convocatorias} />
            </Box>

        </JobsLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {


    const session: any = await getSession({ req });

    const { user } = session;

    const post = await prisma.postulante.findFirst({
        where: {
            persona_id: parseInt(user.persona.id)
        },
        include: {
            persona: {
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            estudios: true,
            cargo: true,
            investigacion: true,
            capacitacion: true,
            aficion: true,
            reconocimiento: true,
            tics: true

        }
    })


    const postulante = JSON.parse(JSON.stringify(post))

    const convocatorias = await prisma.postulante_x_convocatoria.findMany({
        where: {
            postulante_id: post?.id,
        },
        select: {
            id: true,
            session: true,
            comentario: true,
            convocatoria: {
                select: {
                    titulo: true,
                    estado: true,

                }
            },
            estado_postulante: {
                select: {
                    nombre: true,
                }
            }
        },
    });

    await prisma.$disconnect()


    return {
        props: {

            postulante,
            convocatorias
        }
    }
}

export default MisDatosPage


