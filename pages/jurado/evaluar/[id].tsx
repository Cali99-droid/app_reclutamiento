
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { Link, Box, Typography, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent, Button, DialogActions, DialogContent, Chip, Grid, Paper, styled, Toolbar, AppBar, Breadcrumbs } from '@mui/material';
import { evaluacion, evaluacion_x_postulante, postulante } from '@prisma/client';


import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IJob } from '@/interfaces';
import { reclutApi } from '@/apies';
import { Modal, ModalAptitud, ModalEntrevista } from '@/components/modal';
import RatingFrom from '@/components/modal/RatingForm';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import { Paperbase } from '@/components/dash';
import ModalClase from '@/components/modal/ModalClase';
import { PostulantsList } from '../../../components/postulants/PostulantsList';
import { Ficha } from '../../../components/postulants/Ficha';
import { getSession } from 'next-auth/react';
interface Props {
    postulantes: postulante[]
    convocatoria: IJob
    evaluaciones: evaluacion[]

}

const EvaluarPage: NextPage<Props> = ({ convocatoria, evaluaciones }) => {
    const router = useRouter();
    const { id } = router.query
    const { data, error } = useSWR<any[]>(`/api/jurado/postulantes/${id}`);

    const [postulantes, setPostulantes] = useState<any[]>([]);

    const { openClase, handleCloseClase, handleConfirmClase, openAptitud, handleConfirmAptitud, handleCloseAptitud, idUser } = useContext(PostContext);

    useEffect(() => {
        if (data) {
            const newPost = data.sort((x, y) => x.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje) - y.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje)).reverse()
            setPostulantes(newPost);

        }

    }, [data, idUser])







    return (
        <Paperbase title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
            <ToastContainer />
            <Box sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', }} className="fadeIn" >
                <Box mb={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}>
                            Convocatorias
                        </Link>

                        <Typography fontWeight={'bold'} color="text.primary">{convocatoria.titulo}</Typography>
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
    const convocatoriaSer = await prisma.convocatoria.findUnique({
        where: {
            id: parseInt(id.toString())
        },
        include: {
            estado: {
                select: { id: true, nombre: true },
            },
            grado: {
                select: { nombre: true },
            },
            categoria: {
                select: { nombre: true }
            },
            _count: {
                select: { postulante_x_convocatoria: true }
            }
        },
    })

    const session: any = await getSession({ req });



    const { user } = session;
    if (user.rol_id === 3 && convocatoriaSer?.categoria_id !== 2) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    if (user.rol_id === 4 && convocatoriaSer?.categoria_id !== 1) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }
    if (convocatoriaSer?.estadoId !== 2) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }


    const evaluaciones = JSON.parse(JSON.stringify(await prisma.evaluacion.findMany()))
    const convocatoria = JSON.parse(JSON.stringify(convocatoriaSer))
    await prisma.$disconnect()

    return {
        props: { convocatoria, evaluaciones }
    }
}


export default EvaluarPage;
