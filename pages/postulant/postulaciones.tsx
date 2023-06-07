import { JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { Alert, AlertTitle, Box, Button, Chip, Grid, IconButton, Paper, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
import { UploadFileOutlined } from "@mui/icons-material";
import { cyan } from "@mui/material/colors";
interface Props {

    convocatorias: any[],


}


const PostulacionesPage: NextPage<Props> = ({ convocatorias }) => {

    const columns: GridColDef[] = [

        {
            field: 'convocatoria',
            headerName: 'Puesto',
            width: 200,
            editable: true,
        },



        {
            field: 'estadoPostulante',
            headerName: 'Estado  Postulante',
            width: 250,
            renderCell: (params) => {
                return (
                    <Chip color="warning" label={`${params.row.estadoPostulante}`} variant='outlined' />

                )
            }
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            description: 'Muestra el estado de la convocatoria',
            width: 150,
            renderCell: (params) => {
                return (




                    <Button disabled={params.row.estadoPostulante !== 'pasa a evaluación'} variant="outlined" startIcon={< UploadFileOutlined />}>
                        Subir Sesión
                    </Button>

                )
            }
        },
        {
            field: 'mensajes',
            headerName: 'Mensaje',
            width: 550,
            renderCell: (params) => {
                return (
                    <Alert severity="info">
                        <AlertTitle> Atención</AlertTitle>
                        {params.row.mensajes}
                    </Alert>

                )
            }
        },


    ];


    const rows = convocatorias.map((job) => ({
        id: job.id,
        convocatoria: job.convocatoria.titulo,
        estado: job.convocatoria.estado.nombre,
        estadoPostulante: job.estado_postulante.nombre === 'No interesa' ? 'No fuiste seleccionado' : job.estado_postulante.nombre,
        mensajes: job.comentario,


    }))

    return (
        <JobsLayout title={"Mis postulaciones"} pageDescription={"Lista de postulacioes"}>
            <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={18}  >
                <Paper sx={{ bgcolor: '#0045AA' }} >
                    <Grid container spacing={2} alignItems="center" mb={1} padding={2}>
                        <Grid item>
                            <span color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <Typography variant="h2" color={'#FFF'}>Mis postulaciones</Typography>
                        </Grid>

                    </Grid>
                </Paper>
                <Paper sx={{ bgcolor: '#eeeeee' }}>

                    <Box sx={{ height: 400, width: '100%', padding: 2 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            sx={{ bgcolor: '#FFF' }}
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

