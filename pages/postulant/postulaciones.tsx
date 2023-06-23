import { JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { Alert, AlertTitle, Box, Button, Chip, Grid, IconButton, LinearProgress, Paper, Tooltip, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
import { Edit, UploadFileOutlined } from "@mui/icons-material";
import { cyan } from "@mui/material/colors";
import { Modal } from "@/components/modal";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { reclutApi } from "@/apies";
import { toast, ToastContainer } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from "next/router";
interface Props {

    convocatorias: any[],


}


const PostulacionesPage: NextPage<Props> = ({ convocatorias }) => {



    const [convo, setConvo] = useState<number | null>(null)
    const [doc, setDoc] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null)

    const router = useRouter();





    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }



        try {

            toast.info('Cargando Documento')
            const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/docupload', {
                name: target.files[0].name,
                type: target.files[0].type
            });

            const url = data.url;
            const res = await reclutApi.put(url, target.files[0], {
                headers: {
                    "Content-type": target.files[0].type,
                    "Access-Control-Allow-Origin": "*"
                }
            })


            setDoc(data.message);

            guardarSession(data.message, convo)
            toast.success('Guardado Correctamente !!')



        } catch (error) {
            toast.error('Hubo un error !!')
            console.log({ error });
        }


    }



    const asignarSession = (id: number) => {
        setConvo(id)
        fileInputRef.current?.click()
        console.log(id)
    }

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
                    <Chip color="info" label={`${params.row.estadoPostulante}`} variant='outlined' />

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



                    <>


                        <Box>

                            <Tooltip title={'Ver sesión'}>
                                <span>
                                    <IconButton target="_blank" href={`/postulant/doc/${params.row.id}`} disabled={params.row.estadoPostulante !== 'pasa a evaluación'}>
                                        < RemoveRedEyeIcon />
                                    </IconButton>
                                </span>

                            </Tooltip>
                            <Tooltip title={'Subir o reemplazar sesión'}>
                                <span>
                                    <IconButton onClick={() => asignarSession(params.row.id)} disabled={params.row.estadoPostulante !== 'pasa a evaluación'}>
                                        < UploadFileOutlined />
                                    </IconButton>
                                </span>

                            </Tooltip>
                            <input
                                ref={fileInputRef}
                                type="file"

                                accept='.pdf'
                                style={{ display: 'none' }}
                                onChange={onFilesSelected}
                            />
                        </Box>



                    </>


                )
            }
        },
        {
            field: 'mensajes',
            headerName: 'Mensaje',
            width: 400,
            renderCell: (params) => {
                return (
                    params.row.mensajes ? (
                        <Alert severity="info">
                            <AlertTitle> Atención</AlertTitle>
                            {params.row.mensajes}
                        </Alert>
                    ) : (
                        <p>No tienes mensajes </p>
                    )


                )
            }
        },


    ];


    const rows = convocatorias.map((job) => ({
        id: job.id,
        sesion: job.session,
        convocatoria: job.convocatoria.titulo,
        estado: job.convocatoria.estado.nombre,
        estadoPostulante: job.estado_postulante.nombre === 'No interesa' ? 'No fuiste seleccionado' : job.estado_postulante.nombre,
        mensajes: job.comentario,


    }))

    return (
        <JobsLayout title={"Mis postulaciones"} pageDescription={"Lista de postulacioes"}>
            <Box bgcolor={'#F8F8FF'} paddingBottom={6} height={900}>
                <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={18} >
                    <Box padding={4} >
                        <Box paddingTop={2} paddingBottom={2}>
                            <Typography variant='h2' fontWeight={'bold'}>Mis Postulaciones</Typography>
                            <Divider />
                        </Box>
                        <Paper>

                            <Box sx={{ width: '100%', padding: 2 }} height={400} >
                                <DataGrid
                                    getRowHeight={() => 'auto'}
                                    rows={rows}
                                    columns={columns}
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                                    sx={{ bgcolor: '#FFF' }}
                                />
                            </Box>

                        </Paper>
                    </Box>
                </Box>
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
            convocatorias

        }
    }
}

export default PostulacionesPage

async function guardarSession(doc: string, id: any) {


    try {
        const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/session', {
            doc: doc,
            id: id
        });

    } catch (error) {
        console.log(error)
    }

}

