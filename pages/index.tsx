import { JobsLayout } from "@/components/layouts";


import { Box, Button, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';


import { ImageSlideshow } from '../components/ui/ImageSlideshow';

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
      <Box sx={{ mt: 10, padding: 6 }} width={'100%'}>

        <Grid container padding={2} spacing={4}>
          <Grid item xs={12} sm={6}>

            <Box sx={{ height: '50vh' }} paddingTop={7}>
              <Typography variant='h1' component='h1' fontSize={60}>Oficina de Recursos Humanos</Typography>
              <Typography textAlign={'justify'} mt={2} >Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis</Typography>
              <Box width={'50%'} mt={10}>
                <Button color="info" size="large" fullWidth>
                  Conocer mas

                </Button>
              </Box>

            </Box>
          </Grid>
          <Grid item xs={12} sm={6} >
            <Box sx={{ height: '70vh' }} >
              <ImageSlideshow images={images} />
            </Box>
          </Grid>
        </Grid>

      </Box>
      <Box>

      </Box>



    </JobsLayout>
  )
}
