
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { Link, Box, Typography, Breadcrumbs } from '@mui/material';
import { postulante } from '@prisma/client';


import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IJob } from '@/interfaces';

import { ModalAptitud, } from '@/components/modal';


import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import { Paperbase } from '@/components/dash';
import ModalClase from '@/components/modal/ModalClase';
import { PostulantsList } from '../../../components/postulants/PostulantsList';

import { getSession } from 'next-auth/react';
interface Props {
    postulantes: postulante[]
    convocatoria: any


}

const EvaluarPage: NextPage<Props> = ({ convocatoria }) => {
    const router = useRouter();
    const { id } = router.query
    const { data, error } = useSWR<any[]>(`/api/jurado/postulantes/${id}`);

    const [postulantes, setPostulantes] = useState<any[]>([]);

    const { openClase, handleCloseClase, handleConfirmClase, openAptitud, handleConfirmAptitud, handleCloseAptitud, idUser } = useContext(PostContext);

    useEffect(() => {
        if (data) {
            // const newPost = data.sort((x, y) => x.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje) - y.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje)).reverse()
            setPostulantes(data);

        }

    }, [data, idUser])







    return (
        <Paperbase title={`Administrar convocatoria: ${convocatoria.convocatoria.titulo} `} subTitle={"Resumen"}>
            <ToastContainer />
            <Box sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', }} className="fadeIn" >
                <Box mb={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push("/jurado")} sx={{ cursor: 'pointer' }}>
                            Convocatorias
                        </Link>

                        <Typography fontWeight={'bold'} color="text.primary">{convocatoria.convocatoria.titulo}</Typography>
                    </Breadcrumbs>
                </Box>
                <Box>
                    <PostulantsList postulants={postulantes} />
                </Box>
            </Box>


            <ModalClase title={'Evaluar Clase Modelo'} open={openClase} handleClose={handleCloseClase} handleConfirm={handleConfirmClase} />
            <ModalAptitud title={'Evaluar aptitudes'} open={openAptitud} handleClose={handleCloseAptitud} handleConfirm={handleConfirmAptitud} />


        </Paperbase>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { id = '' } = query;
    const session: any = await getSession({ req });

    const { user } = session;
    const convocatoriaSer = await prisma.convocatoria_x_jurado.findFirst({
        where: {
            convocatoria_id: parseInt(id.toString())
        },
        select: {
            user_id: true,
            convocatoria: {
                select: {
                    id: true,
                    titulo: true,
                    estado: true
                }
            },

        }

    })

    if (convocatoriaSer) {
        if (convocatoriaSer.convocatoria.estado.id === 3 || convocatoriaSer.user_id !== parseInt(user.id)) {
            return {
                redirect: {
                    destination: '/jurado',
                    permanent: false
                }
            }
        }
    } else {
        return {
            redirect: {
                destination: '/jurado',
                permanent: false
            }
        }
    }


    console.log(convocatoriaSer)



    const convocatoria = JSON.parse(JSON.stringify(convocatoriaSer))
    await prisma.$disconnect()

    return {
        props: { convocatoria }
    }
}


export default EvaluarPage;
