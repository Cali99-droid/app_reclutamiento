import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';

import { useJobs } from '../../hooks';
import { grey } from "@mui/material/colors";
export default function ConvocatoriasPage() {
  const { jobs } = useJobs('/convocatorias')
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatorias a trabajos en Ancash"}>
      <Box className="fadeIn" padding={8}>
        <Box bgcolor={grey[200]} padding={3} borderRadius={2} width={'100%'} >
          <Typography fontSize={50} variant='h1' component='h1' >Convocatoria {new Date().getFullYear()}</Typography>

          <Typography color={grey[700]} variant='h2' sx={{ mt: 2 }}>Trabaja con nosotros, encuentra tu perfil y postula </Typography>
        </Box>
        <Divider />
        <Box >
          <JobList jobs={jobs} />
          {jobs.length === 0 && (
            <Box bgcolor={grey[50]} padding={3} borderRadius={2} width={'100%'} >
              <Typography color={grey[800]} variant='h2' textAlign={'center'}>No hay convocatorias abiertas, pronto tendremos nuevas convocatorias</Typography>
            </Box>
          )}
        </Box>
      </Box>



    </JobsLayout>

  )
}