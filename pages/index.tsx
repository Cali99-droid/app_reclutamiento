import { JobsLayout } from "@/components/layouts";


import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { grey } from "@mui/material/colors";



export default function Home() {
  return (
    <JobsLayout title={"AE | Empleos "} pageDescription={"Convocatoria a trabajos en Ancash"}>
         <Box mt={15}  sx={{backgroundColor:'#F4F4F4'}}>
          <Typography variant='h1' component='h1'>Recursos Humanos</Typography>
        </Box> 
        <Divider variant="middle" /> 
    </JobsLayout>
  )
}
