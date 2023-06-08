import { Paperbase } from '@/components/dash'
import { FullScreenLoading } from '@/components/ui';
import { Box, Breadcrumbs, Grid, Link, Paper, Typography, styled, useMediaQuery } from '@mui/material';
import { DataGrid, esES } from '@mui/x-data-grid';
import { useRouter } from 'next/router';
import React from 'react'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10

}));
const DashdoardPage = () => {

    const router = useRouter();
    const matches = useMediaQuery('(min-width:600px)');


    return (
        <Paperbase title={`Daashboard `} subTitle={"Resumen"}>



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
                                    width: '100%',
                                    '& .mal': {
                                        backgroundColor: '#ff5722',
                                        color: '#FFF',
                                    },
                                    '& .medio': {
                                        backgroundColor: '#ff943975',
                                        color: '#FFF',
                                    },
                                    '& .bien': {
                                        backgroundColor: '#4caf50',
                                        color: '#FFF',
                                    },
                                }} >

                                <DataGrid
                                    localeText={esES.components.MuiDataGrid.defaultProps.localeText} columns={[]} rows={[]} />


                            </Box>
                        </Item>

                    </Box>
                </Box>
            }










        </Paperbase>

    )
}
export default DashdoardPage
