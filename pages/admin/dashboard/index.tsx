import { Paperbase } from '@/components/dash'
import { FullScreenLoading } from '@/components/ui';
import { Box, Breadcrumbs, CardMedia, Grid, Link, Paper, Typography, styled, useMediaQuery } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { prisma } from '../../../server/db/client';
import { postulante, convocatoria } from '@prisma/client';
import HelpIcon from '@mui/icons-material/Help';


interface Props {
    postulantes: any[]

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
                    image={row.img}
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
const DashdoardPage: NextPage<Props> = ({ postulantes }) => {

    const router = useRouter();
    const matches = useMediaQuery('(min-width:600px)');

    const rows = postulantes.map((p, index) => ({
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
                    <Box mb={2}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link underline="hover" color="inherit" onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}>
                                Convocatorias
                            </Link>

                            <Typography fontWeight={'bold'} color="text.primary">Hola</Typography>
                        </Breadcrumbs>
                    </Box>

                    <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'}>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4} >
                                <Item elevation={4}>

                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Vacantes</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >Item </Typography>

                                        </Box>
                                    </Box>

                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box>  <Typography color={'#454555'} variant="body1" > Postulantes</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >item 2 </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4} >
                                <Item elevation={4}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box>

                                            <Typography color={'#454555'} variant="body1" > Estado </Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box><Typography color={'#454555'} variant="body1" > Categoria</Typography>
                                            <Typography color={'#454555'} fontWeight={'bold'} fontSize={37} textTransform={'capitalize'}>number</Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Seleccionados</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" textTransform={'uppercase'}>number</Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Item elevation={4}>
                                    <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>

                                        <Box>
                                            <Typography color={'#454555'} variant="body1" > Descartados</Typography>
                                            <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >item</Typography>

                                        </Box>
                                    </Box>
                                </Item>
                            </Grid>

                        </Grid>

                    </Box>
                    <Box mt={4}
                    >
                        <Item elevation={4} sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }}>

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
    const postulantes = JSON.parse(JSON.stringify(listaPostulantes))

    await prisma.$disconnect()

    return {
        props: {
            postulantes

        }
    }
}
export default DashdoardPage
