import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useJobs } from '../../hooks';
import { grey } from "@mui/material/colors";
import { FullScreenLoading } from "@/components/ui";
import { IJob } from "@/interfaces";
import moment from "moment";
import { Footer } from "@/views/HomePage/Footer";
function filtrarPorFecha(datos: IJob) {

  const fechaHoy = new Date();
  const fechaConvo = moment(datos.vigencia).add(1, 'days').toDate();

  if (fechaConvo >= fechaHoy) {
    return datos;
  }

}

export default function ConvocatoriasPage() {
  const { jobs, isLoading } = useJobs('/convocatorias')


  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatorias a trabajos en Ancash"}>
      <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={22} >
        <Box padding={3}  >
          <Typography fontSize={35} variant='h1' component='h1' color={'#000'} fontWeight={'bold'}  >Convocatoria {new Date().getFullYear()}</Typography>

          <Typography fontSize={18} color={grey[700]} variant='h2' sx={{ mt: 2 }}>Encuentra tu perfil y postula </Typography>
        </Box>
        <Divider />
        <Box >
          {isLoading
            ? <FullScreenLoading />
            :
            <JobList jobs={jobs} />
          }
          {jobs.length === 0 && (
            <Box bgcolor={grey[50]} padding={3} borderRadius={2} width={'100%'} >
              <Typography color={grey[800]} variant='h2' textAlign={'center'}>No hay convocatorias abiertas, pronto tendremos nuevas convocatorias</Typography>
            </Box>
          )}
        </Box>
      </Box>

      <Footer />

    </JobsLayout>

  )
}