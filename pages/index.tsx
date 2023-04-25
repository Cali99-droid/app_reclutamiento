import { JobsLayout } from "@/components/layouts";


import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { grey } from "@mui/material/colors";
import Image from "next/image";



export default function Home() {
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"} >
      <Box sx={{ mt: 10, paddingTop: 2, background: '#F3F3F3' }} width={'100%'}>

        <Grid container padding={4}>
          <Grid item xs={6}>
            <Container maxWidth="lg"  >
              <Box sx={{ height: '50vh' }} paddingTop={7}>
                <Typography variant='h1' component='h1' fontSize={60}>Oficina de Recursos Humanos</Typography>
                <Typography textAlign={'justify'} mt={2} >Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis</Typography>
                <Box width={'50%'} mt={10}>
                  <Button color="info" size="large" fullWidth>
                    Conocer mas

                  </Button>
                </Box>
              </Box>
            </Container>

          </Grid>
          <Grid item xs={6}>
            <Container maxWidth="lg" >
              <Box sx={{ height: '90vh' }} >
                <Card
                  sx={{ height: '70vh', width: '100%' }}

                >

                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="600"
                      image="/img/logo.png"
                      alt="green oth"
                    />
                    <CardContent>




                      {/* <Box mt={1}>
                        <Chip label={`${job.categoria}`} color="success" variant="outlined" />
                    </Box> */}
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>


                  </CardActions>

                </Card>
              </Box>
            </Container>

          </Grid>
          <Grid item xs={12}>
            <Container maxWidth="xl" >
              <Box sx={{ height: '25vh' }} >
                <Typography variant='h1' component='h1'>Recursos Humanos</Typography>
              </Box>
            </Container>

          </Grid>

        </Grid>


      </Box>



    </JobsLayout>
  )
}
