import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { jobs } from '../../database/seed';
import Divider from '@mui/material/Divider';


export default function ConvocatoriasPage() {
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"}>
        <Box mt={15}>
          <Typography variant='h1' component='h1'>Convocatoria 2023</Typography>

            <Typography variant='h2' sx={{ mt: 4 }}>Trabaja con nosotros, encuentra tu perfil y postula </Typography>
        </Box>    
        <Divider variant="middle" />
        <JobList jobs={jobs} />
    </JobsLayout>
  )
}