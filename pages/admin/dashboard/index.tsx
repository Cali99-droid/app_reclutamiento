import { Paperbase } from '@/components/dash'
import { FullScreenLoading } from '@/components/ui';
import { Box, Breadcrumbs, Card, CardMedia, Grid, IconButton, Link, Paper, Typography, styled, useMediaQuery, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, GridToolbar, esES } from '@mui/x-data-grid';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { prisma } from '../../../server/db/client';
import HailIcon from '@mui/icons-material/Hail';
import 'react-toastify/dist/ReactToastify.css';
import PeopleIcon from '@mui/icons-material/People';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import WorkOffIcon from '@mui/icons-material/WorkOff';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { reclutApi } from '@/apies';
import { convocatoria, categoria } from '@prisma/client';
import NextLink from 'next/link';
interface Props {
    contratados: any[]
    convocatoriasAbiertas: number
    baja: any[]
    posts: any[]
    // juradosAsignados: any[]
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,

    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10


}));

function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const DashdoardPage: NextPage<Props> = ({ contratados, convocatoriasAbiertas, baja, posts }) => {

    const bajasDocentes = baja.filter(e => e.convocatoria.categoria_id === 2);
    const bajasAdmis = baja.filter(e => e.convocatoria.categoria_id === 1);
    const postDocente = posts.filter(e => e.convocatoria.categoria_id === 2);
    const postAdmin = posts.filter(e => e.convocatoria.categoria_id === 1);
    const contratadosDoce = contratados.filter(e => e.convocatoria.categoria_id === 2)
    const contratadosAdmin = contratados.filter(e => e.convocatoria.categoria_id === 1)

    const { push, asPath } = useRouter();
    const matches = useMediaQuery('(min-width:600px)');
    const formatoNombre = (nombres: string, apellidoPat: string, apellidoMat: string) => {
        const str = apellidoPat + ' ' + apellidoMat + ' ' + nombres;
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
        });

    }

    const rows = contratados.map((p, index) => ({
        id: index + 1,
        img: p.postulante.image,
        nombres: formatoNombre(p.postulante.persona.nombres, p.postulante.persona.apellido_pat, p.postulante.persona.apellido_mat),
        puesto: p.convocatoria.titulo,
        idPos: p.postulante.id,
        idCp: p.id,
        fecha: dayjs(p.fecha_cambio).locale('es').format('LLLL'),
        categoria: p.convocatoria.categoria.nombre
    }))

    const handleFiltro = (val: Dayjs | null) => {
        setValue(val);
        console.log('Filtrando desde ' + val?.year())
    }
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());


    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'N°',
            width: 50,

        },
        {
            field: 'img',
            headerName: 'Foto',
            filterable: false,
            renderCell: ({ row }) => {
                return (

                    <CardMedia
                        component='img'
                        alt={row.title}
                        className='fadeIn'
                        image={row.img === null ? '/avatar.jpg' : `${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${row.img}`}
                    />

                )
            }
        },

        {
            field: 'nombres',
            headerName: 'Nombres',
            width: 250,
            renderCell: ({ row }) => {
                return (
                    <NextLink href={`/admin/trabajador/${row.idPos}`} passHref legacyBehavior>
                        <Link underline='always'>
                            {row.nombres}
                        </Link>
                    </NextLink>
                )
            }
        },


        {
            field: 'puesto',
            headerName: 'Convocatoria',
            width: 250,
        },
        {
            field: 'categoria',
            headerName: 'Categoria',
            width: 150,
        },
        {
            field: 'fecha',
            headerName: 'Fecha de Ascenso',
            width: 150,
        },
        {
            field: 'actions',
            headerName: 'Dar de Baja',
            width: 150, renderCell: ({ row }) => {
                return (

                    <Box display={'flex'} justifyContent={'start'} width={'100%'}>
                        <Tooltip title={'Dar de baja'}>
                            <IconButton aria-label="baja" color='error' onClick={() => handleConfirm(row.idCp)}  >
                                <WorkOffIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={'Lista negra'}>
                            <IconButton aria-label="baja" color='error' onClick={() => handleConfirmBlack(row.idCp, row.idPos)}  >
                                <DoDisturbIcon />
                            </IconButton>
                        </Tooltip>

                        {/* <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { hadleOpenAlert(params.row.id, params.row.nombre) }}  >
                  <DeleteIcon />
                </IconButton> */}
                    </Box>

                )
            }

        },






    ];

    const darBaja = async (id: number) => {

        // return;
        try {

            const res = await reclutApi.put('/admin/postulantes/1', { id, status: 10 });

            toast.info(' ¡Dado de Baja Correctamente! ')
            push(asPath)
            // const newId = parseInt(newStatus) + 1
            // setIdEstado(newId)   


        } catch (error) {

            console.log(error);
            alert('No se pudo actualizar el estado del postulante');
        }
    }
    const addToBlackList = async (id: number, idPos: number) => {
        // console.log(id);
        // return;
        try {

            const res = await reclutApi.post('/admin/blacklist', { id, status: 10, idPos });

            toast.info(' ¡Agregado a la Lista negra! ')
            push(asPath)
            // const newId = parseInt(newStatus) + 1
            // setIdEstado(newId)   


        } catch (error) {

            console.log(error);
            alert('No se pudo actualizar el estado del postulante');
        }
    }

    const handleConfirm = (id: number) => {
        Swal.fire({
            title: '¿Esta seguro? ',
            text: 'Se dará de baja al trabajador',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                darBaja(id)
            } else {
                console.log('no borrar')
            }
        });
    };
    const handleConfirmBlack = (id: number, idPos: number) => {
        Swal.fire({
            title: '¿Esta seguro? ',
            text: 'El trabajador pasará a la lista negra para posteriores convocatorias',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                addToBlackList(id, idPos)
            } else {
                console.log('no borrar')
            }
        });
    }
    return (
        <Paperbase title={`Dashboard `} subTitle={"Resumen"}>
            {false
                ? <FullScreenLoading />
                :
                <Box sx={matches ? { width: '100%', margin: 'auto' } : { maxWidth: 350, margin: 'auto', }} className="fadeIn" >

                    <Grid container spacing={2} justifyContent={'center'}>

                        <Grid item xl={12} lg={10} md={8} sm={12}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={12}>

                                <Box bgcolor={'#FFF'} padding={1.5} borderRadius={1} display={'flex'} justifyContent={'end'}>

                                    <DatePicker label={'Año'} openTo="year" value={value} views={['year']}
                                        onChange={(newValue) => handleFiltro(newValue)} />
                                </Box>

                            </Grid> */}
                                <Grid item xs={12} >

                                    <Typography textAlign={'center'}>Docentes</Typography>

                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} >
                                    <Item elevation={4}>

                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'}>
                                            <HailIcon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>

                                                <Typography color={'#454555'} variant="subtitle2" >  Contratados - {new Date().getFullYear()}</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant='h5' >{contratadosDoce.length} </Typography>
                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'} >

                                            <PeopleIcon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>
                                                <Typography color={'#454555'} variant="subtitle2" > Postulantes {new Date().getFullYear()}</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant="h5" >{postDocente.length} </Typography>

                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'} >

                                            <PersonRemoveAlt1Icon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>
                                                <Typography color={'#454555'} variant="subtitle2" > Dados de Baja</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant="h5" >{bajasDocentes.length} </Typography>

                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xs={12}>

                                    <Typography textAlign={'center'}>Administrativos</Typography>

                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} >
                                    <Item elevation={4}>

                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'}>
                                            <HailIcon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>

                                                <Typography color={'#454555'} variant="subtitle2" >  Contratados - {new Date().getFullYear()}</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant="h5" >{contratadosAdmin.length} </Typography>
                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'} >

                                            <PeopleIcon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>
                                                <Typography color={'#454555'} variant="subtitle2" > Postulantes {new Date().getFullYear()}</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant="h5" >{postAdmin.length} </Typography>

                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>
                                <Grid item xl={4} lg={4} md={4} sm={4} xs={12} >
                                    <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                        <Box display={'flex'} justifyContent={'space-between'} padding={1} alignItems={'center'} >

                                            <PersonRemoveAlt1Icon sx={{ fontSize: 40 }} color={'primary'} />
                                            <Box>
                                                <Typography color={'#454555'} variant="subtitle2" > Dados de Baja</Typography>
                                                <Typography fontWeight={'bold'} color={'#454555'} variant="h5" >{bajasAdmis.length} </Typography>

                                            </Box>
                                        </Box>
                                    </Item>
                                </Grid>

                            </Grid>

                        </Grid>


                        <Grid item xl={12} lg={10} md={8} sm={12} xs={12}>
                            <Item elevation={4} >
                                <Typography textAlign={'center'}>Lista de Contratados</Typography>
                                <Box
                                    sx={{
                                        height: 400,
                                        padding: 1
                                    }} >

                                    <DataGrid
                                        getRowHeight={() => 'auto'}
                                        getRowId={(row: any) => generateRandom()}
                                        localeText={esES.components.MuiDataGrid.defaultProps.localeText} columns={columns}
                                        rows={rows}
                                        slots={{ toolbar: GridToolbar }}
                                        slotProps={{
                                            toolbar: {
                                                showQuickFilter: true,
                                                quickFilterProps: { debounceMs: 500 },
                                            },
                                        }}
                                    />


                                </Box>
                            </Item>

                        </Grid>
                    </Grid>
                </Box>
            }
        </Paperbase>

    )
}
export const getServerSideProps = async () => {

    const convocatorias = await prisma.convocatoria.findMany({
        where: {
            estadoId: 1
        }
    })

    const bajas = await prisma.postulante_x_convocatoria.findMany({
        where: {
            estado_postulante_id: 10,
        },
        select: {
            postulante: true,
            convocatoria: true
        }

    })
    const postulantes = await prisma.postulante_x_convocatoria.findMany({
        select: {
            postulante: true,
            convocatoria: true
        }
    })
    const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
        where: {
            estado_postulante_id: 7,
        },

        select: {
            id: true,
            fecha_cambio: true,
            postulante: {
                select: {
                    id: true,
                    persona: true,
                    image: true
                }


            },
            convocatoria: {
                select: {
                    titulo: true,
                    categoria_id: true,
                    categoria: true,
                }

            }
        },
    });
    await prisma.$disconnect()
    const contratados = JSON.parse(JSON.stringify(listaPostulantes))
    const baja = JSON.parse(JSON.stringify(bajas))
    const posts = JSON.parse(JSON.stringify(postulantes))
    const convocatoriasAbiertas = convocatorias.length;



    return {
        props: {
            contratados,
            convocatoriasAbiertas,
            baja,
            posts
        }
    }
}
export default DashdoardPage
