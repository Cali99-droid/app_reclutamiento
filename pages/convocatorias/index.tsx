import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box, Divider, useMediaQuery } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useJobs } from '../../hooks';
import { grey } from "@mui/material/colors";
import { FullScreenLoading } from "@/components/ui";
import { IJob } from "@/interfaces";
import moment from "moment";
import { Footer } from "@/views/HomePage/Footer";
import SquareIcon from '@mui/icons-material/Square';
function filtrarPorFecha(datos: IJob) {

  const fechaHoy = new Date();
  const fechaConvo = moment(datos.vigencia).add(1, 'days').toDate();

  if (fechaConvo >= fechaHoy) {
    return datos;
  }

}

export default function ConvocatoriasPage() {
  const { jobs, isLoading } = useJobs('/convocatorias')

  const matches = useMediaQuery('(min-width:600px)');
  return (
    <JobsLayout title={"AE | Convocatorias "} pageDescription={"Lista de empleos disponibles en la institución, ¡Aplica hoy mismo!  "}>
      <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={22} >
        <Box padding={3}  >
          <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={matches ? 'start' : 'center'} mb={2}>
            <SquareIcon color="secondary" fontSize="large" />
            <Typography variant='h2' component='h2' fontWeight={'bold'} fontSize={30} color={'#000'} textTransform={'uppercase'}> Convocatorias {new Date().getFullYear()}</Typography>
          </Box>


          <Typography fontSize={18} color={grey[700]} variant='h2' sx={{ mt: 2 }}>Oportunidades laborales en Huaraz, Únete a un equipo comprometido con la excelencia educativa en nuestra academia preuniversitaria. Descubre cómo puedes formar parte de nuestro legado. </Typography>
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