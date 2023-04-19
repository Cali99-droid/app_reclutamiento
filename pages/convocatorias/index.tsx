import { JobList } from "@/components/jobs/JobList";
import { JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';

import Divider from '@mui/material/Divider';

import { useJobs } from '../../hooks';
import { grey } from "@mui/material/colors";
export default function ConvocatoriasPage() {
  const {jobs} = useJobs('/convocatorias')
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatorias a trabajos en Ancash"}>
      <Box className="fadeIn" >
            <Box mt={15} bgcolor={grey[200]} padding={3} borderRadius={2} >
              <Typography variant='h1' component='h1' color={grey[700]}>Convocatoria 2023</Typography>

              <Typography variant='h2' sx={{ mt: 4 }}>Trabaja con nosotros, encuentra tu perfil y postula </Typography>
            </Box>    
       
          <Box >
            <JobList  jobs={jobs} />
          </Box>
      </Box>
   
      
       
    </JobsLayout>
    
  )
}