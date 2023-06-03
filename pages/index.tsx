import { JobsLayout } from "@/components/layouts";

import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Link, List, ListItem, ListItemText, Paper, } from '@mui/material';
import Typography from '@mui/material/Typography';

import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import { ArrowLeft, ArrowRight, CalendarMonth, EmojiEventsOutlined, Facebook, HistoryEdu, ShieldOutlined, Twitter } from "@mui/icons-material";
import SchoolIcon from '@mui/icons-material/School';
import Divider from '@mui/material/Divider';

import styled from "styled-components";
import Image from 'next/image';

import SquareIcon from '@mui/icons-material/Square';
import VerticalTabs from "@/views/VerticalTabs";
import LinkedInIcon from '@mui/icons-material/LinkedIn';




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


export default function Home() {


  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"} >

      <Box maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={25}>
        <Box display={"flex"} gap={20}>
          <Box paddingTop={7} >
            <Typography variant='h1' component='h1' fontSize={90} color={'#000'} fontWeight={'bold'} >Trabaja con nosotros</Typography>
            <Typography textAlign={'start'} mt={2} color={'#454555'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis, lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis</Typography>
            <Box display={'flex'} gap={4}>
              <Button size="large" sx={{ mt: 5 }} endIcon={<ArrowRight />}>
                CONOCER MAS

              </Button>
              <Button color="inherit" size="large" sx={{ mt: 5 }} endIcon={<ArrowRight />} href="/auth/register">
                REGISTRARME

              </Button>
            </Box>

          </Box>
          <Box >
            <Image src={"/img/hero-image.svg"} alt={""} width={500} height={600} />
          </Box>
        </Box>
        <Box width={'100%'} >
          <Typography variant='h6' component='h6' color={'#767687'} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Nuestras Instituciones</Typography>
          <Box display={'flex'} justifyContent={'space-between'} gap={5} mt={8}>
            <Box>
              <Typography component='p' color={'primary'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Colegio Albert Einstein</Typography>
            </Box>
            <Box>
              <Typography component='p' color={'secondary'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Academia Encinas</Typography>
            </Box>
            <Box>
              <Typography component='p' color={'#ED1C24'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Jardin</Typography>
            </Box>

            <Box>
              <Typography component='p' color={'#767687'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Otra Institucion</Typography>
            </Box>
          </Box>

        </Box>

        <Box className='fadeIn' mt={10}>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <SquareIcon color="secondary" fontSize="large" />
            <Typography variant='h2' component='h2' fontWeight={'bold'} textAlign={'start'} fontSize={40} color={'#000'} > BENEFICIOS </Typography>
          </Box>

          <Box display={'flex'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>
            <Box>
              <Image src={"/img/b1.svg"} alt={""} width={500} height={600} />

            </Box>
            <Box>
              <Typography fontWeight={900} sx={{ fontSize: 50 }} color={'#000'}>
                Ingreso a planilla con beneficios de ley
              </Typography>
              <Typography variant="body1" color={'#767687'} >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', fontWeight: 'bold' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
              </Typography>
            </Box>


          </Box>

          <Box display={'flex'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>

            <Box>
              <Typography fontWeight={900} sx={{ fontSize: 50 }} color={'#000'}>
                Linea de carrera y escala salarial
              </Typography>
              <Typography variant="body1" color={'#767687'} >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', color: '#0045AA' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
              </Typography>
            </Box>
            <Box>
              <Image src={"/img/b2.svg"} alt={""} width={500} height={600} />

            </Box>

          </Box>

          <Box display={'flex'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>
            <Box>
              <Image src={"/img/b3.svg"} alt={""} width={500} height={600} />

            </Box>

            <Box>
              <Typography fontWeight={900} sx={{ fontSize: 50 }} color={'#000'}>
                Premios y reconocimeintos
              </Typography>
              <Typography variant="body1" color={'#767687'} >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', color: '#0045AA', fontWeight: 'bold' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
              </Typography>
              <Divider />
              <Box textAlign={'end'} mt={2}>
                <Chip
                  label="Ver mas beneficios"
                  color="secondary"
                  clickable

                />
              </Box>
            </Box>

          </Box>


        </Box>


      </Box>

      <Box  >
        <Box padding={10} bgcolor={'#001A72'} >
          <Typography variant="h2" color={'#FFF'} fontSize={50} textAlign={'center'} fontWeight={'bold'}>¿Cómo Postular?</Typography>
          <Typography color={'#FFF'} textAlign={'center'} > Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem</Typography>
          <Box mt={3} maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={5}>
            <VerticalTabs />
          </Box>

        </Box>
      </Box>
      <Box maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={5} >
        <Box display={'flex'} alignItems={'center'} gap={1}>
          <SquareIcon color="secondary" fontSize="large" />
          <Typography variant='h2' component='h2' fontWeight={'bold'} textAlign={'start'} fontSize={40} color={'#000'} > NOSOTROS </Typography>
        </Box>
        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit totam provident dolore velit officiis, quae blanditiis pariatur, sint, voluptatibus quas mollitia nemo ad doloremque similique. Optio expedita explicabo adipisci consequatur.</Typography>
        <Grid container spacing={30} justifyContent={'center'} padding={10}>
          <Grid item>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 350 }}
                image="img/ejecutivo2.jpg"
                title="green iguana"
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
              <CardMedia
                sx={{ height: 350 }}
                image="img/ejecutivo1.jpg"
                title="green iguana"
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
              <CardMedia
                sx={{ height: 350 }}
                image="img/ejecutivo3.jpg"
                title="green iguana"
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




      </Box>

      <Box maxWidth={1200} margin={'auto'}>
        <Typography variant="h2" color={'#000'} fontSize={50} textAlign={'center'} fontWeight={'bold'}>¿Tienes dudas?</Typography>
        <Typography textAlign={'center'} fontSize={20} paddingTop={3}>Ponte en contacto con nosotros mediante nuestros canales de atención</Typography>
        <Box display={'flex'} justifyContent={'space-evenly'} padding={10}>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Link sx={{ cursor: 'pointer' }}>
              <Image src={"/img/whatsapp-icon.svg"} alt={""} width={150} height={150} />
            </Link>


          </Paper>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Link sx={{ cursor: 'pointer' }}>
              <Image src={"/img/facebook.svg"} alt={""} width={150} height={150} />
            </Link>
          </Paper>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Link sx={{ cursor: 'pointer' }}>
              <Image src={"/img/google-gmail.svg"} alt={""} width={150} height={150} />
            </Link>
          </Paper>
        </Box>

      </Box>
      <Box>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#001A72" fill-opacity="1" d="M0,32L80,53.3C160,75,320,117,480,112C640,107,800,53,960,32C1120,11,1280,21,1360,26.7L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
        <Box padding={10} bgcolor={'#001A72'} mt={-25}>


          <Box mt={3} maxWidth={1200} sx={{ margin: 'auto' }} >
            <Typography variant="h2" color={'#FFF'} fontSize={50} textAlign={'center'} fontWeight={'bold'} textTransform={'capitalize'}>Asociacion educativa Luz y Ciencia</Typography>
            <Grid container mt={10} justifyContent={'space-around'}>
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


    </JobsLayout >
  )
}
