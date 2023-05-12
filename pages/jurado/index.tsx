import { DashLayout, JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { AppBar, Box, Button, Chip, Grid, IconButton, Paper, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
import { Paperbase } from '../../components/dash/Paperbase';
import { useRouter } from "next/router";
import { useContext } from 'react';


interface Props {

    convocatorias: any[],


}


const JuradoPage: NextPage<Props> = ({ convocatorias }) => {


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


    const rows = convocatorias.map((convocatoria) => ({
        id: convocatoria.id,
        convocatoria: convocatoria.titulo,
        estado: convocatoria.estado.nombre,

    }))

    return (
        <Paperbase title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"} >
            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' }}>
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
    const convocatorias = await prisma.convocatoria.findMany({
        where: {
            estadoId: 2,
            AND: {
                categoria_id: category
            }
        },
        include: {
            estado: true,
        }

    });

    await prisma.$disconnect()

    return {
        props: {
            convocatorias

        }
    }
}

export default JuradoPage

