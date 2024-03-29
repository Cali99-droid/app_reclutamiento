import { DashLayout, JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { AppBar, Box, Button, Chip, Grid, IconButton, Paper, Toolbar, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria, categoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
import { Paperbase } from '../../components/dash/Paperbase';
import { useRouter } from "next/router";
import { useContext } from 'react';
import { parse } from "path";
import { ToastContainer } from "react-toastify";


interface Props {

    convocatorias: any[],


}


const JuradoPage: NextPage<Props> = ({ convocatorias }) => {


    const convocatoriasAsignadas = convocatorias.filter(c => c.convocatoria.estado.id !== 3)


    const { push } = useRouter();
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'convocatoria',
            headerName: 'Puesto',
            width: 200,

        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <Chip label={row.estado} variant="outlined" color="primary" />
                )
            }

        },
        {
            field: 'categoria',
            headerName: 'Categoria',
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <Chip label={row.categoria} color="info" />
                )
            }

        },

        {
            field: 'actions', headerName: 'Acciones', width: 200,
            sortable: false,
            renderCell: (params) => {
                return (

                    <Box display={'flex'} justifyContent={'start'} width={'100%'}>


                        <Button color='success' aria-label="delete" onClick={() => push(`/jurado/evaluar/${params.row.id}`)}>
                            Evaluar
                        </Button>
                    </Box>


                )
            }
        }


    ];


    const rows = convocatoriasAsignadas.map((c) => ({
        id: c.convocatoria.id,
        convocatoria: c.convocatoria.titulo,
        estado: c.convocatoria.estado.nombre,
        categoria: c.convocatoria.categoria.nombre

    }))
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Paperbase title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"} >
            <ToastContainer />
            <Paper sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <span color="inherit" />
                            </Grid>
                            <Grid item xs>
                                <Typography>Listado de convocatorias</Typography>
                            </Grid>
                            <Grid item>


                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Box className="fadeIn" padding={4}>

                    <Grid
                        container
                        justifyContent={'end'}

                    >
                        <Grid item >

                        </Grid >
                        <Grid item xs={12} sx={{ height: 580, width: '100%' }}>

                            <DataGrid
                                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                rows={rows}
                                columns={columns}
                                rowHeight={45}
                            />
                        </Grid>
                    </Grid>


                </Box>
            </Paper>


        </Paperbase>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    let category = 1;
    const session: any = await getSession({ req });

    const { user } = session;

    if (user.rol_id === 3) {
        category = 2;
    }
    if (user.rol_id === 4) {
        category = 1;
    }

    // const convocatorias = await apiCon('/admin/convocatorias')
    const convocatoriasSer = await prisma.convocatoria_x_jurado.findMany({
        where: {
            user_id: parseInt(user.id)
        },
        select: {
            convocatoria: {
                select: {
                    id: true,
                    titulo: true,
                    estado: true,
                    categoria: true
                }
            },

        }

    });

    const convocatorias = JSON.parse(JSON.stringify(convocatoriasSer))
    await prisma.$disconnect()

    return {
        props: {
            convocatorias

        }
    }
}

export default JuradoPage

