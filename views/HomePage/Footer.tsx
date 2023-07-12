import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image';


export const Footer = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill=" #0045aa" fill-opacity="1" d="M0,128L40,117.3C80,107,160,85,240,74.7C320,64,400,64,480,90.7C560,117,640,171,720,202.7C800,235,880,245,960,218.7C1040,192,1120,128,1200,122.7C1280,117,1360,171,1400,197.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            <Box padding={10} bgcolor={'#0045aa'} mt={-10}>


                <Box mt={3} maxWidth={1200} sx={{ margin: 'auto' }} >
                    <Box display={'flex'} justifyContent={'center'}>
                        <Image priority src={"/img/logoxs.png"} alt={"imagen colegio albert einstein"} width={250} height={67} />
                    </Box>
                    {/* <Typography variant="h2" color={'#FFF'} fontSize={50} textAlign={'center'} fontWeight={'bold'} textTransform={'capitalize'}>Asociacion educativa Luz y Ciencia</Typography>
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

                    </Grid> */}

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
