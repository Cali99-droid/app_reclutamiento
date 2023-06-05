import { JobsLayout } from "@/components/layouts";
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Link, Paper, useMediaQuery, } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Facebook, Twitter } from "@mui/icons-material";
import Image from 'next/image';
import SquareIcon from '@mui/icons-material/Square';
import VerticalTabs from "@/views/HomePage/VerticalTabs";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Hero } from '../views/HomePage/Hero';
import { Partners } from "@/views/HomePage/Partners";
import { Beneficios } from '../views/HomePage/Beneficios';
import { How } from "@/views/HomePage/How";
import { Nosotros } from "@/views/HomePage/Nosotros";
import { Dudas } from "@/views/HomePage/Dudas";
import { Footer } from "@/views/HomePage/Footer";


export default function Home() {
  const matches = useMediaQuery('(min-width:600px)');


  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"} >

      <Box maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={18} >
        <Hero />
        <Partners />
        <Beneficios />
      </Box>

      <Box  >
        <How />
      </Box>
      <Box maxWidth={1200} padding={2} margin={'auto'} >
        <Nosotros />
      </Box>

      <Box maxWidth={1200} margin={'auto'}>
        <Dudas />

      </Box>

      <Footer />


    </JobsLayout >
  )
}
