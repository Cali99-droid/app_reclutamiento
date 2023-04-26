import { JobsLayout } from "@/components/layouts";


import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { grey } from "@mui/material/colors";
import Image from "next/image";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccessibleIcon from '@mui/icons-material/Accessible';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
export default function Home() {
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"} >
      <Box sx={{ mt: 10, padding: 6 }} width={'100%'}>

        <Grid container padding={2} spacing={4}>
          <Grid item xs={6}>

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
          <Grid item xs={6} >

            <Box sx={{ height: '70vh' }} >
              <Card
                sx={{ height: '70vh', width: '100%' }}

              >


                <CardMedia
                  component="img"
                  height="600"
                  image="/img/fondo.jpg"
                  alt="green oth"
                />





                {/* <Box mt={1}>
                        <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                    </Box> */}


                {/* <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>


                </CardActions> */}

              </Card>
            </Box>


          </Grid>
          <Grid item xs={12}>

            <Box sx={{ height: '25vh' }} >
              <Box display={'flex'} mt={15} gap={10} justifyContent={'space-around'}>
                <Box>
                  <EmojiObjectsIcon color="primary" sx={{ fontSize: 100 }} />
                  <Typography>Objetivos</Typography>
                </Box>
                <Box>
                  <AccessibleIcon color="primary" sx={{ fontSize: 100 }} />
                  <Typography>
                    Accesibles
                  </Typography>
                </Box>
                <Box>
                  <Diversity1Icon color="primary" sx={{ fontSize: 100 }} />
                  <Typography>Diversos</Typography>
                </Box>
                <Box>
                  <EmojiEmotionsIcon color="primary" sx={{ fontSize: 100 }} />
                  <Typography>Clima laboral </Typography>
                </Box>


              </Box>
            </Box>


          </Grid>

        </Grid>


      </Box>



    </JobsLayout>
  )
}
