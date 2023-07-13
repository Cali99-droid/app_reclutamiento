import { Box, Button, Card, CardActions, CardContent, Grid, IconButton, MobileStepper, Paper, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import SquareIcon from '@mui/icons-material/Square';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Facebook, KeyboardArrowLeft, KeyboardArrowRight, Twitter } from '@mui/icons-material';
import Image from 'next/image';



const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath:
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bird',
        imgPath:
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
    },
    {
        label: 'Bali, Indonesia',
        imgPath:
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
    },
    {
        label: 'Goč, Serbia',
        imgPath:
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
    },
];

export const Nosotros = () => {
    const matches = useMediaQuery('(min-width:600px)');

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <>
            <Box display={'flex'} alignItems={'center'} gap={1} mb={3} id={'nosotros'}>
                <SquareIcon color="secondary" fontSize="large" />
                <Typography variant='h2' component='h2' fontWeight={'bold'} textAlign={'start'} fontSize={30} color={'#000'} textTransform={'uppercase'}>  Nuestro Equipo </Typography>
            </Box>
            <Typography textAlign={'left'}>Únete a nuestra comunidad educativa en crecimiento, donde la colaboración y el liderazgo son fundamentales. Descubre a las personas apasionadas que hacen posible nuestro colegio, donde los estudiantes alcanzan su máximo potencial. ¡Sé parte de nuestro equipo destacado en el Colegio Albert Einstein!</Typography>
            <Grid container spacing={5} justifyContent={'center'} padding={10}>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <Image
                            alt={"ejecutivo"} width={matches ? 300 : 300} height={matches ? 300 : 300}
                            src="/img/ejecutivo2.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Juan Carlos Gutierrez
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Director Ejecutivo
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display={'flex'}>
                                <IconButton aria-label="linkedin">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Facebook />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Twitter />
                                </IconButton>

                            </Box>
                        </CardActions>
                    </Card>



                </Grid>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <Image
                            alt={"ejecutivo"} width={matches ? 300 : 300} height={matches ? 300 : 300}
                            src="/img/ejecutivo1.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Rosa Maria Flores
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Director Ejecutivo
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display={'flex'}>
                                <IconButton aria-label="linkedin">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Facebook />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Twitter />
                                </IconButton>

                            </Box>
                        </CardActions>
                    </Card>

                </Grid>
                <Grid item>
                    <Card sx={{ maxWidth: 345 }}>
                        <Image
                            alt={"ejecutivo"} width={matches ? 300 : 300} height={matches ? 300 : 300}
                            src="/img/ejecutivo3.jpg"

                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Jose Fidel Castro
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Director Ejecutivo
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Box display={'flex'}>
                                <IconButton aria-label="linkedin">
                                    <LinkedInIcon />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Facebook />
                                </IconButton>
                                <IconButton aria-label="linkedin">
                                    <Twitter />
                                </IconButton>

                            </Box>
                        </CardActions>
                    </Card>

                </Grid>

            </Grid>

        </>



    )
}
