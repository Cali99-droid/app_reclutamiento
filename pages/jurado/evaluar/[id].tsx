
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { Link, Box, Typography, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent, Button, DialogActions, DialogContent, Chip, Grid, Paper, styled, Toolbar, AppBar, Breadcrumbs } from '@mui/material';
import { evaluacion, evaluacion_x_postulante, postulante } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TaskTwoToneIcon from '@mui/icons-material/TaskTwoTone';
import { cyan } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IJob } from '@/interfaces';
import { reclutApi } from '@/api';
import { Modal, ModalAptitud, ModalEntrevista } from '@/components/modal';
import RatingFrom from '@/components/modal/RatingForm';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


import { Paperbase } from '@/components/dash';
import ModalClase from '@/components/modal/ModalClase';
import { PostulantsList } from '../../../components/postulants/PostulantsList';
import { Ficha } from '../../../components/postulants/Ficha';
interface Props {
    postulantes: postulante[]
    convocatoria: IJob
    evaluaciones: evaluacion[]

}

const EvaluarPage: NextPage<Props> = ({ convocatoria, evaluaciones }) => {
    const router = useRouter();
    const { id } = router.query
    const { data, error } = useSWR<any[]>(`/api/admin/postulantes/${id}`);

    const [postulantes, setPostulantes] = useState<any[]>([]);
    const [status, setStatus] = useState(true)
    const { criterios, calcularTotal, limpiarCriterios, openClase, handleCloseClase, handleConfirmClase } = useContext(PostContext);
    const [total, setTotal] = useState(0)



    useEffect(() => {
        if (data) {
            // const newPost = data?.sort((x, y) => x.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje) - y.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje)).reverse()
            setPostulantes(data);

        }

    }, [data])


    const devolverPuntajeEntrevista = (puntajes: evaluacion_x_postulante[]) => {
        let formato = '';

        puntajes.forEach(p => {
            formato += p.puntaje + ','

        });


        return formato.split(',')[0]
    }
    const devolverPuntajeJurado = (puntajes: evaluacion_x_postulante[]) => {
        let formato = '';
        puntajes.forEach(p => {
            formato += p.puntaje + ','

        });


        return formato.split(',')[1]
    }

    const tot = (puntajes: evaluacion_x_postulante[]) => {
        let suma = 0;
        puntajes.forEach(p => {
            suma += p.puntaje
        });

        return suma;

    }


    const [idEv, setIdEv] = useState<string | number>('');
    const [idPos, setIdPos] = useState<string | number>('');


    const refreshData = () => {
        router.replace(router.asPath)
    }
    //------------------------------------Evaluaciones-----------------------------------------------------







    //-------------------------------------------------------------------
    const [openAptitud, setOpenAptitud] = useState(false)
    const handleOpenAptitud = (id: number) => {
        setOpenAptitud(true);
        setIdPos(id)
        setIdEv(2)
    };

    const handleCloseAptitud = () => {
        setOpenAptitud(false);
    };
    const handleConfirmAptitud = async () => {
        //TODO validar actualizacion o creacion  */


        const puntaje = calcularTotal();


        try {

            const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100 });
            console.log(resp)
            toast.success('🦄 Puntaje asignado correctamente!'),
                handleCloseAptitud()
            limpiarCriterios()

        } catch (error) {

            console.log(error);
            alert('El postulante ya tiene puntaje');
        }





    };



    return (
        <Paperbase title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { id = '' } = query;
    const convocatoria = await prisma.convocatoria.findUnique({
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


    const evaluaciones = JSON.parse(JSON.stringify(await prisma.evaluacion.findMany()))
    await prisma.$disconnect()

    return {
        props: { convocatoria, evaluaciones }
    }
}


export default EvaluarPage;
