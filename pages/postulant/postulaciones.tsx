import { JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { Box, Chip, Grid, Paper, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
interface Props {

    convocatorias: any[],


}


const PostulacionesPage: NextPage<Props> = ({ convocatorias }) => {

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Código', width: 90 },
        {
            field: 'convocatoria',
            headerName: 'Puesto',
            width: 300,
            editable: true,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            description: 'Muestra el estado de la convocatoria',
            width: 200,
            renderCell: (params) => {
                return (
                    <Chip color="info" label={`${params.row.estado}`} variant='outlined' />

                )
            }
        },

        {
            field: 'estadoPostulante',
            headerName: 'Estado Del Postulante',
            width: 200,
            renderCell: (params) => {
                return (
                    <Chip color="warning" label={`${params.row.estadoPostulante}`} variant='outlined' />

                )
            }
        },
        {
            field: 'mensajes',
            headerName: 'Mensaje',
            width: 300,
            editable: true,
        },


    ];

    console.log(convocatorias)
    const rows = convocatorias.map((job) => ({
        id: job.id,
        convocatoria: job.convocatoria.titulo,
        estado: job.convocatoria.estado.nombre,
        estadoPostulante: job.estado_postulante.nombre,
        mensajes: job.comentario

    }))

    return (
        <JobsLayout title={"Mis postulaciones"} pageDescription={"Lista de postulacioes"}>
            <Box mb={2} mt={15} padding={4}  >
                <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'visible' }} >
                    <Grid container spacing={2} alignItems="center" mb={2} padding={2}>
                        <Grid item>
                            <span color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <Typography>Mis postulaciones</Typography>
                        </Grid>

                    </Grid>
                </Paper>
                <Paper >

                    <Box sx={{ height: 400, width: '100%', padding: 2 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}

                        />
                    </Box>

                </Paper>
            </Box>


        </JobsLayout >
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
            convocatorias

        }
    }
}

export default PostulacionesPage

