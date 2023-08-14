import { JobsLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { Alert, AlertTitle, Badge, Box, Button, Chip, Grid, IconButton, LinearProgress, Menu, Paper, Tooltip, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { postulante, convocatoria, categoria, mensajes } from '@prisma/client';
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { IConvocatoriaPostulante, IJob } from "@/interfaces";
import { DataGrid, GridColDef, GridValueGetterParams, esES } from '@mui/x-data-grid';
import { Edit, UploadFileOutlined } from "@mui/icons-material";
import { cyan } from "@mui/material/colors";
import { Modal } from "@/components/modal";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { reclutApi } from "@/apies";
import { toast, ToastContainer } from 'react-toastify';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useRouter } from "next/router";
import MailIcon from '@mui/icons-material/Mail';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import moment from 'moment';
import 'moment/locale/es';
import { useMsg } from "@/hooks";
import { AuthContext } from "@/context";
moment.locale('es');
interface Props {

    convocatorias: any[],
    // mensajes: mensajes[],


}

const PostulacionesPage: NextPage<Props> = ({ convocatorias }) => {

    const { push } = useRouter()

    // const { isLoggedIn, user, logout } = useContext(AuthContext);
    // const id = user?.persona.postulante[0].id;
    // console.log(id)
    const { mensajes } = useMsg(`/msg/1`)
    const noLeidos = mensajes.filter(m => m.status !== 1);

    const [convo, setConvo] = useState<number | null>(null)
    const [doc, setDoc] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null)



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


    const markAsRead = async (id: number) => {
        try {

            const { data } = await reclutApi.put(`/msg/${id}`);
            toast.success('Marcado como leído')

        } catch (error) {
            toast.error('Hubo un error !!')
            console.log({ error });
        }
    }
    const asignarSession = (id: number) => {
        setConvo(id)
        fileInputRef.current?.click()

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
            width: 300,
            renderCell: (params) => {
                return (



                    <>
                        {
                            params.row.categoria === 1 ? (
                                <Chip color="info" variant="outlined" label={'No disponible'} />
                            ) : (
                                <Box display={'flex'}>

                                    <Tooltip title={'Ver sesión'}>
                                        <span>
                                            <IconButton target="_blank" href={`/postulant/doc/${params.row.id}`} disabled={params.row.estadoPostulante !== 'Apto evaluación'}>
                                                < RemoveRedEyeIcon />
                                            </IconButton>
                                        </span>

                                    </Tooltip>
                                    <Tooltip title={'Subir o reemplazar sesión'}>
                                        <span>
                                            <IconButton onClick={() => asignarSession(params.row.id)} disabled={params.row.estadoPostulante !== 'Apto evaluación'}>
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
                                    {
                                        params.row.sesion && params.row.estadoPostulante === 'Apto evaluación' ? (
                                            <Chip color="success" label='!Sesión subida!' />
                                        ) : (
                                            !params.row.sesion && params.row.estadoPostulante === 'Apto evaluación' && (
                                                <Chip color="warning" label='Debe subir su sesión de clase' />
                                            )

                                        )
                                    }
                                </Box>
                            )
                        }




                    </>


                )
            }
        },
        // {
        //     field: 'mensajes',
        //     headerName: 'Mensaje',
        //     width: 200,
        //     renderCell: (params) => {
        //         return (
        //             params.row.mensajes ? (
        //                 <>
        //                     <Alert severity="info">
        //                         <AlertTitle> Atención</AlertTitle>
        //                         {params.row.mensajes}
        //                     </Alert>

        //                 </>
        //             ) : (

        //                 <p>No tiene mensajes </p>
        //             )
        //         )
        //     }
        // },


    ];
    const getPuntajeEntrevista = (puntajes: any[]) => {
        let puntaje = 0;

        const resultado = puntajes.forEach(x => {
            //rol de admin
            if (x.user.rol_id === 5) {
                puntaje += (x.total / x.maximo)

            } else {
                return '';
            }
        });
        return (Math.round(puntaje * 100));
    }
    const getPuntajeJurado = (puntajes: any[]) => {
        let puntaje = 0;

        const resultado = puntajes.forEach(x => {
            //rol de admin
            if (x.user.rol_id === 3 || x.user.rol_id === 4) {
                puntaje += (x.total)

            } else {
                return '';
            }
        });
        return (puntaje);
    }
    const getEstado = (estado: string, puntajeEntr: number, puntajeJur: number) => {
        console.log(puntajeJur)
        switch (estado) {
            case 'Inscrito':
                return 'Inscrito'

            case 'Apto entrevista':
                if (puntajeEntr > 0) {
                    return 'Entrevistado'
                }
                return 'Apto entrevista'
            case 'Apto evaluación':

                if (puntajeJur > 0) {
                    console.log('entro')
                    return 'Evaluado'
                }
                return 'Apto evaluación'

            default:
                return estado
                break;
        }
    }

    const rows = convocatorias.map((job) => ({
        id: job.id,
        sesion: job.session,
        convocatoria: job.convocatoria.titulo,
        estado: getEstado(job.estado_postulante.nombre, getPuntajeEntrevista(job.postulante.puntajes), getPuntajeJurado(job.postulante.puntajes)),
        estadoPostulante: job.estado_postulante.nombre === 'No interesa' ? 'En proceso' : getEstado(job.estado_postulante.nombre, getPuntajeEntrevista(job.postulante.puntajes), getPuntajeJurado(job.postulante.puntajes)),
        mensajes: job.comentario,
        categoria: job.convocatoria.categoria.id

    }))

    const [anchorNoti, setAnchorNoti] = useState<null | HTMLElement>(null);
    const openNoti = Boolean(anchorNoti);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if (Notification.permission !== 'granted') {
            requestNotificationPermission()
        }
        setAnchorNoti(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorNoti(null);
    };
    const requestNotificationPermission = async () => {
        try {
            const permissionResult = await Notification.requestPermission();
            console.log('Permission:', permissionResult);
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };
    const showNotification = () => {
        if (Notification.permission === 'granted') {
            const notification = new Notification('Tienes un nuevo mensaje', {
                body: '¡Hola, tienes un nuevo mensaje del la oficina de talento del colegio Albert Eintein!',
                icon: '/img/logo.png', // Ruta a tu icono de notificación
            });

            notification.onclick = () => {
                push('/postulant/postulaciones');

            };
        }
    };
    // useEffect(() => {
    //     const noLeidos = mensajes.filter(m => m.status !== 1);
    //     if (noLeidos.length > 0) {
    //         console.log('entro')
    //         showNotification()
    //     }

    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [mensajes])
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <JobsLayout title={"Mis postulaciones"} pageDescription={"Lista de postulacioes"}>
            <Box bgcolor={'#EDF1F7'} paddingBottom={6} height={900} mt={8}>
                <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto', width: '90%' }} pt={15}>
                    <Box >
                        <Box paddingBottom={2} display={'flex'} justifyContent={'space-between'}>
                            <Typography variant='h2' fontWeight={'bold'}>Mis Postulaciones</Typography>

                            <Box>

                                <Badge badgeContent={noLeidos.length} onClick={handleClick} color="error">
                                    <MailIcon color="info" />
                                </Badge>

                                <Menu
                                    anchorEl={anchorNoti}
                                    id="account-menu"
                                    open={openNoti}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <Box padding={1} width={matches ? 500 : 300} overflow={'auto'} height={300}>
                                        {mensajes.map(m => (
                                            <Box key={m.id}>
                                                <Box display={'flex'} justifyContent={'space-between'}>
                                                    <Box mb={1}>
                                                        <Typography fontSize={15}>{m.contenido}</Typography>
                                                        <Typography fontSize={12} variant='body2' color={'gray'}>{m.fecha ? (moment(m.fecha).fromNow()) : 'No hay mensajes'}</Typography>
                                                    </Box>
                                                    <Box >
                                                        <Tooltip title="Marcar como leído">
                                                            <IconButton color="warning" disabled={m.status === 1} aria-label="delete" size="small" onClick={() => markAsRead(m.id)}>
                                                                <MarkEmailReadIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Box>

                                                </Box>
                                                <Divider />

                                            </Box>
                                        ))}
                                    </Box>

                                </Menu>
                            </Box>
                        </Box>  <Divider /><Typography fontSize={15}>Aqui observará el estado de sus postulaciones y realizará acciones segun la etapa en que se encuentre, es importante que revise periódicamente esta sección para que pueda estar al dia con el proceso de selección.</Typography>
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
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
    const resConvocatoria = await prisma.postulante_x_convocatoria.findMany({
        where: {
            postulante_id: persona?.postulante[0].id,
        },
        select: {
            id: true,
            session: true,
            comentario: true,
            postulante: {
                select: {
                    puntajes: {
                        include: {
                            user: true
                        }
                    }
                }
            },
            convocatoria: {
                select: {
                    titulo: true,
                    estado: true,
                    categoria: true,
                }
            },
            estado_postulante: {
                select: {
                    nombre: true,
                }
            }
        },
    });

    // const msg = await prisma.mensajes.findMany({
    //     where: {
    //         postulante_id: persona?.postulante[0].id
    //     }, orderBy: {
    //         id: 'desc'
    //     }
    // })
    const convocatorias = JSON.parse(JSON.stringify(resConvocatoria))
    // const mensajes = JSON.parse(JSON.stringify(msg))
    await prisma.$disconnect()

    return {
        props: {
            convocatorias,


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

