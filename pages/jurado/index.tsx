import { DashLayout, JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Paperbase } from '../../components/dash/Paperbase';
interface Props {

    convocatorias: any[],


}


const juradoPage: NextPage<Props> = ({ convocatorias }) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'convocatoria',
            headerName: 'Puesto',
            width: 200,
            editable: true,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 150,
            editable: true,
        },


    ];


    const rows = convocatorias.map((job) => ({
        id: job.id,
        convocatoria: job.convocatoria.titulo,
        estado: job.convocatoria.estado.nombre,

    }))

    return (
        <Paperbase title={"Evaluar convocatorias"} subTitle={"jurado"} >
            <h2>Jurados</h2>

        </Paperbase>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req });



    const { user } = session;

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

    // const convocatorias = await apiCon('/admin/convocatorias')
    const convocatorias = await prisma.postulante_x_convocatoria.findMany({
        where: {
            postulante_id: persona?.postulante[0].id,
        },
        include: {
            convocatoria: {
                select: {
                    titulo: true,
                    estado: true,
                }
            }
        },
    });

    await prisma.$disconnect()

    return {
        props: {
            convocatorias

        }
    }
}

export default juradoPage

