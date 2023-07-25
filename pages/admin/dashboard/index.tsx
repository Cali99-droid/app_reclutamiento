import { Paperbase } from '@/components/dash'
import { FullScreenLoading } from '@/components/ui';
import { Box, Breadcrumbs, Card, CardMedia, Grid, IconButton, Link, Paper, Typography, styled, useMediaQuery, Tooltip } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { prisma } from '../../../server/db/client';
import HailIcon from '@mui/icons-material/Hail';
import DvrIcon from '@mui/icons-material/Dvr';
import PeopleIcon from '@mui/icons-material/People';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import Swal from 'sweetalert2';
interface Props {
    contratados: any[]
    convocatoriasAbiertas: number
    // juradosAsignados: any[]
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: 1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10


}));
const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Cod',
        width: 100,

    },
    {
        field: 'img',
        headerName: 'Foto',

        renderCell: ({ row }) => {
            return (

                <CardMedia
                    component='img'
                    alt={row.title}
                    className='fadeIn'
                    image={row.img === null ? '/avatar.jpg' : `https://caebucket.s3.us-west-2.amazonaws.com/img/${row.img}`}
                />

            )
        }
    },

    {
        field: 'nombres',
        headerName: 'Nombres',
        width: 250,

    },


    {
        field: 'puesto',
        headerName: 'Convocatoria',
        width: 300,
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
                        <IconButton aria-label="baja" color='error' onClick={() => handleConfirm(row.idPos)}  >
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
function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}
const handleConfirm = (id: any) => {
    Swal.fire({
        title: '¿Esta seguro? ',
        text: 'Se dará de baja al trabajador',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('borrando' + id)
        } else {
            console.log('no borrar')
        }
    });
};
const DashdoardPage: NextPage<Props> = ({ contratados, convocatoriasAbiertas }) => {

    const { push } = useRouter();
    const matches = useMediaQuery('(min-width:600px)');

    const rows = contratados.map((p, index) => ({
        id: index + 1,
        img: p.postulante.image,
        nombres: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,
        puesto: p.convocatoria.titulo,
        idPos: p.postulante.id,
    }))

    const handleFiltro = (val: Dayjs | null) => {
        setValue(val);
        console.log('Filtrando desde ' + val?.year())
    }
    const [value, setValue] = React.useState<Dayjs | null>(dayjs());



    return (
        <Paperbase title={`Dashboard `} subTitle={"Resumen"}>
            {false
                ? <FullScreenLoading />
                :
                <Box sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }} className="fadeIn" >

                    <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>

                                <Box bgcolor={'#FFF'} padding={1.5} borderRadius={1} display={'flex'} justifyContent={'end'}>

                                    <DatePicker label={'Año'} openTo="year" value={value} views={['year']}
                                        onChange={(newValue) => handleFiltro(newValue)} />
                                </Box>

                            </Grid>
                            <Grid item xs={12}>
                                <Item elevation={0}>
                                    <Typography variant='h6'>Docentes</Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Item elevation={4}>

                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                                        <HailIcon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>

                                            <Typography color={'#454555'} variant="body1" >  Contratados - {new Date().getFullYear()}</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{contratados.length} </Typography>
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <PeopleIcon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Postulantes {new Date().getFullYear()}</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <PersonRemoveAlt1Icon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Dados de Baja</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12}>
                                <Item elevation={0}>
                                    <Typography variant='h6'>Administrativos</Typography>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Item elevation={4}>

                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                                        <HailIcon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>

                                            <Typography color={'#454555'} variant="body1" >  Contratados - {new Date().getFullYear()}</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{contratados.length} </Typography>
                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <PeopleIcon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Postulantes {new Date().getFullYear()}</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <PersonRemoveAlt1Icon sx={{ fontSize: 40 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Dados de Baja</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>

                        </Grid>

                    </Box>
                    <Box mt={4}
                    >
                        <Item elevation={4} sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 500, margin: 'auto', overflow: 'visible' }}>
                            <Typography>Lista de Contratados</Typography>
                            <Box
                                sx={{
                                    height: 400,
                                    padding: 1
                                }} >

                                <DataGrid
                                    getRowHeight={() => 'auto'}
                                    getRowId={(row: any) => generateRandom()}
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText} columns={columns} rows={rows} />


                            </Box>
                        </Item>

                    </Box>
                </Box>
            }
        </Paperbase>

    )
}
export const getStaticProps: GetStaticProps = async () => {

    const convocatorias = await prisma.convocatoria.findMany({
        where: {
            estadoId: 1
        }
    })
    const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
        where: {
            estado_postulante_id: 7
        },

        select: {

            postulante: {
                select: {
                    id: true,
                    persona: true,
                    image: true
                }


            },
            convocatoria: {
                select: {
                    titulo: true
                }

            }
        },
    });
    await prisma.$disconnect()
    const contratados = JSON.parse(JSON.stringify(listaPostulantes))
    const convocatoriasAbiertas = convocatorias.length;



    return {
        props: {
            contratados,
            convocatoriasAbiertas
        },
        revalidate: 1
    }
}
export default DashdoardPage
