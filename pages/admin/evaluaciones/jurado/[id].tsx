import NextLink from 'next/link';
import { AdminLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, Box, Typography, IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { convocatoria, evaluacion } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { cyan } from '@mui/material/colors';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';
import { useRouter } from 'next/router';


interface Props {
    postulantes: any[]
    convocatoria: convocatoria
    evaluaciones: evaluacion[]

}

const JuradoPage: NextPage<Props> = ({ postulantes, convocatoria, evaluaciones }) => {


    const router = useRouter();
    const [idEv, setIdEv] = useState<string | number>('');
    const [idPos, setIdPos] = useState<string | number>('');
    const [open, setOpen] = useState(false)
    const handleOpen = (id: number) => {
        setOpen(true);
        setIdPos(id)

    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        router.push(`/admin/evaluaciones/${idPos}?tipo=${idEv}`)
        console.log('Evaluacion tipo ' + idEv + ' para postulante ' + idPos)

    };
    const handleChange = (event: SelectChangeEvent<typeof idEv>) => {
        setIdEv(event.target.value);

    };





    return (
        <AdminLayout title={`Administrar convocatoria `} subTitle={"Jurado"}>
            <Box>

            </Box>



        </AdminLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    // const { id = '' } = query;
    // const convocatoria = await prisma.convocatoria.findUnique({
    //     where: {
    //         id: parseInt(id.toString())
    //     }
    // })
    // const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
    //     where: {
    //         convocatoria_id: parseInt(id.toString())
    //     },
    //     include: {
    //         postulante: {
    //             include: {
    //                 persona: true
    //             }
    //         }
    //     },
    // });
    // const postulantes = JSON.parse(JSON.stringify(listaPostulantes))
    // const evaluaciones = await prisma.evaluacion.findMany();
    // await prisma.$disconnect()
    // console.log(evaluaciones)postulantes, convocatoria, evaluaciones
    return {
        props: {}
    }
}


export default JuradoPage;
