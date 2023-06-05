import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material'


export const Footer = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#001A72" fillOpacity="1" d="M0,32L80,53.3C160,75,320,117,480,112C640,107,800,53,960,32C1120,11,1280,21,1360,26.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            <Box padding={10} bgcolor={'#001A72'} mt={-25}>


                <Box mt={3} maxWidth={1200} sx={{ margin: 'auto' }} >
                    <Typography variant="h2" color={'#FFF'} fontSize={50} textAlign={'center'} fontWeight={'bold'} textTransform={'capitalize'}>Asociacion educativa Luz y Ciencia</Typography>
                    <Grid container mt={10} justifyContent={matches ? 'space-around' : 'start'} spacing={4}>
                        <Grid item>
                            <Typography color={'#FFF'} variant="h2" fontWeight={'bold'}>Company</Typography>
                            <Box display={'flex'} flexDirection={'column'} gap={2} mt={5}>

                                <Typography color={'#FFF'} variant="body2" >Privacy Policy</Typography>
                                <Typography color={'#FFF'} variant="body2" >Cookies Policy

                                </Typography>
                            </Box>

                        </Grid>
                        <Grid item>
                            <Typography color={'#FFF'} variant="h2" fontWeight={'bold'}>Colegio</Typography>
                            <Box display={'flex'} flexDirection={'column'} gap={2} mt={5}>

                                <Typography color={'#FFF'} variant="body2" >Features</Typography>
                                <Typography color={'#FFF'} variant="body2" >Something</Typography>
                                <Typography color={'#FFF'} variant="body2" >Something else</Typography>
                                <Typography color={'#FFF'} variant="body2" >And Something else </Typography>
                            </Box>

                        </Grid>
                        <Grid item>
                            <Typography color={'#FFF'} variant="h2" fontWeight={'bold'}>Conocimiento</Typography>
                            <Box display={'flex'} flexDirection={'column'} gap={2} mt={5}>

                                <Typography color={'#FFF'} variant="body2" >Blog</Typography>
                                <Typography color={'#FFF'} variant="body2" >Contact</Typography>
                                <Typography color={'#FFF'} variant="body2" >FAQ</Typography>
                                <Typography color={'#FFF'} variant="body2" >Centro de Ayuda </Typography>
                            </Box>

                        </Grid>
                        <Grid item>
                            <Typography color={'#FFF'} variant="h2" fontWeight={'bold'}>Algo más</Typography>
                            <Box display={'flex'} flexDirection={'column'} gap={2} mt={5}>

                                <Typography color={'#FFF'} variant="body2" >Item</Typography>
                                <Typography color={'#FFF'} variant="body2" >Otro item</Typography>
                                <Typography color={'#FFF'} variant="body2" >y Otro item</Typography>
                                <Typography color={'#FFF'} variant="body2" >?</Typography>
                            </Box>

                        </Grid>

                    </Grid>

                </Box>
                <Box marginTop={4}>
                    <Typography sx={{ color: '#FFF' }} variant="body2" color="text.secondary" align="center">
                        {'Copyright © '}
                        <Link color="inherit" href="https://ae.edu.pe">
                            Colegio Albert Einstein
                        </Link>{' '}
                        {new Date().getFullYear()}.
                    </Typography>

                </Box>

            </Box>
        </Box>
    )
}
