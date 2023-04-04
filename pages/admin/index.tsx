import { JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { jobs } from '../../database/seed';
import Divider from '@mui/material/Divider';
import { AnnouncementList } from '../../components/jobs';


export default function ConvocatoriasPage() {
  return (
    <JobsLayout title={"AE | Administrar convocatorias "} pageDescription={"Convocatorias a trabajos en Ancash"}>
      <Box className="fadeIn">
         <Box mt={15} >
          <Typography variant='h1' component='h1'>Listado de convocatorias</Typography>
        </Box>    
        <Divider variant="middle" />
        <AnnouncementList />
      </Box>
       
    </JobsLayout>
  )
}