import { Paperbase } from '@/components/dash'
import { FullScreenLoading } from '@/components/ui';
import { Box, Breadcrumbs, Card, CardMedia, Grid, Link, Paper, Typography, styled, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { prisma } from '../../../server/db/client';
import HailIcon from '@mui/icons-material/Hail';
import DvrIcon from '@mui/icons-material/Dvr';

interface Props {
    contratados: any[]
    convocatoriasAbiertas: number
    // juradosAsignados: any[]
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
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
                    image={row.img === null ? '/avatar.jpg' : `https://plataforma-virtual.s3.us-west-2.amazonaws.com/img/${row.img}`}
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
        headerName: 'Puesto',
        width: 300,
    },
    {
        field: 'actions',
        headerName: ' Acciones',
        width: 150,

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
const DashdoardPage: NextPage<Props> = ({ contratados, convocatoriasAbiertas }) => {

    const { push } = useRouter();
    const matches = useMediaQuery('(min-width:600px)');

    const rows = contratados.map((p, index) => ({
        id: index + 1,
        img: p.postulante.image,
        nombres: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,
        puesto: p.convocatoria.titulo
    }))
    return (
        <Paperbase title={`Dashboard `} subTitle={"Resumen"}>



            {false
                ? <FullScreenLoading />
                :
                <Box sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }} className="fadeIn" >

                    <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} >
                                <Item elevation={4}>

                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                                        <HailIcon sx={{ fontSize: 60 }} color={'primary'} />
                                        <Box>

                                            <Typography color={'#454555'} variant="body1" >  Contratados - {new Date().getFullYear()}</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{contratados.length} </Typography>

                                        </Box>
                                    </Box>

                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <DvrIcon sx={{ fontSize: 60 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Convocatorias Abiertas</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4} onClick={() => push('/admin/convocatorias')} sx={{ cursor: 'pointer' }}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >

                                        <DvrIcon sx={{ fontSize: 60 }} color={'primary'} />
                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Convocatorias Abiertas</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{convocatoriasAbiertas} </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>


                        </Grid>

                    </Box>
                    <Box mt={4}
                    >
                        <Item elevation={4} sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }}>
                            <Typography>Lista de Contratados</Typography>
                            <Box
                                sx={{
                                    height: 400,

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

        }
    }
}
export default DashdoardPage
