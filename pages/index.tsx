import { JobsLayout } from "@/components/layouts";


import { AppBar, Box, Button, Card, CardMedia, Grid, Grow, useScrollTrigger } from '@mui/material';
import Typography from '@mui/material/Typography';
import Lenis from '@studio-freight/lenis'

import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { CalendarMonth, EmojiEventsOutlined, HistoryEdu, ShieldOutlined } from "@mui/icons-material";
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';
import React, { useRef } from "react";
import { Compo } from '../components/ui/Compo';
import NextLink from 'next/link';
import { Link } from "react-router-dom";


const images = [
  {
    url: '/jobs/img-1.jpg'
  },
  {
    url: '/jobs/img-2.jpg'

  },
  {
    url: '/jobs/img-3.jpg'
  },
  {
    url: '/jobs/img-4.jpg'
  },
  {
    url: '/jobs/logo.png'
  },
];
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function Home() {
  const props: Props = {
    window: undefined,
    children: <></>

  };
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"} >

      <Box>
        <Box bgcolor={'#eeeeee'}>

          <Box sx={{ mt: 10, padding: 6 }} width={'100%'}>

            <Grid container alignContent={'center'} justifyContent={'center'} >
              <Grid item xs={12} sm={6} >

                <Box sx={{
                  height: '50vh', position: 'relative',
                  textAlign: 'center'
                }} paddingTop={7} >
                  <Typography variant='h1' component='h1' fontSize={60}  >Trabaja con nosotros</Typography>
                  <Typography textAlign={'justify'} mt={2}  >Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis, lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis</Typography>
                  <Box width={'50%'} margin={'auto'}>
                    <Button size="large" fullWidth sx={{ mt: 5 }}>
                      Conocer mas

                    </Button>
                  </Box>

                </Box>
              </Grid>
              {/* <Grid item xs={12} sm={6} >
        <Box sx={{ height: '70vh' }} >
          <ImageSlideshow images={images} />
        </Box>
      </Grid> */}
            </Grid>

          </Box>


        </Box>
        <Box padding={8} bgcolor={'#DEDEDE '} >
          <Box width={'70%'} sx={{ margin: 'auto' }}>

            <Box mb={3} >
              <Typography variant='h3' component='h3' fontWeight={'bold'} textAlign={'center'} >Beneficios </Typography>
              <Divider />
            </Box>
            <Grid container spacing={4} alignContent={'center'}>
              <Grid item xs={12} sm={4} >
                <Grow >
                  <Card >
                    <Box display={'flex'} borderRadius={5} padding={2} flexDirection={'column'} >
                      <ShieldOutlined sx={{ fontSize: 60 }} color='info' />
                      <Typography fontWeight={'bold'} sx={{ fontSize: 25 }} >
                        Ingreso a planilla con beneficios de ley
                      </Typography>
                      <Typography variant="body2" >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                      </Typography>

                    </Box>
                  </Card>

                </Grow>

              </Grid>


              <Grid item xs={12} sm={4} >
                <Card >
                  <Box display={'flex'} borderRadius={5} padding={2} justifyContent={'center'} flexDirection={'column'} >
                    <TrendingUpIcon sx={{ fontSize: 60 }} color='info' />
                    <Typography fontWeight={'bold'} sx={{ fontSize: 25 }}>
                      Linea de carrera y escala salarial
                    </Typography>
                    <Typography variant="body2" >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>
                  </Box>
                </Card>

              </Grid>


              <Grid item xs={12} sm={4} >
                <Card>
                  <Box display={'flex'} borderRadius={5} padding={2} justifyContent={'center'} flexDirection={'column'} >
                    <EmojiEventsOutlined sx={{ fontSize: 60 }} color='info' />
                    <Typography fontWeight={'bold'} sx={{ fontSize: 25 }} >
                      Premios y reconocimeintos
                    </Typography>
                    <Typography variant="body2" >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero. Iusto maxime nulla, quis exercitationem porro incidunt vero. exercitationem porro incidunt vero.
                    </Typography>
                  </Box>
                </Card>

              </Grid>

              <Grid item xs={12} sm={4} >
                <Card>
                  <Box display={'flex'} padding={2} justifyContent={'center'} flexDirection={'column'}  >
                    <SchoolIcon sx={{ fontSize: 60 }} color='info' />
                    <Typography fontWeight={'bold'} sx={{ fontSize: 25 }} >
                      Semibecas para hijos de docentes
                    </Typography>
                    <Typography variant="body2" >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>
                  </Box>
                </Card>


              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 400 }}>
                  <Box display={'flex'} padding={2} justifyContent={'center'} flexDirection={'column'} >
                    <HistoryEdu sx={{ fontSize: 60 }} color='info' />
                    <Typography fontWeight={'bold'} sx={{ fontSize: 25 }} >
                      Formación con certificación en diversas instituciones
                    </Typography>
                    <Typography variant="body2" >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>
                  </Box>
                </Card>



              </Grid>

              <Grid item xs={12} sm={4}>
                <Card sx={{ maxWidth: 400 }}>
                  <Box display={'flex'} padding={2} justifyContent={'center'} flexDirection={'column'} >
                    <CalendarMonth sx={{ fontSize: 60 }} color='info' />
                    <Typography fontWeight={'bold'} sx={{ fontSize: 25 }}>
                      Contrato Febrero - Diciembre
                    </Typography>
                    <Typography variant="body2" >
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero. iusto maxime nulla, quis exercitationem porro incidunt vero. exercitationem porro incidunt vero.
                    </Typography>
                  </Box>
                </Card>



              </Grid>


            </Grid>

          </Box>
        </Box>

      </Box>





    </JobsLayout >
  )
}
