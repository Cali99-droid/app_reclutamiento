import { JobsLayout } from "@/components/layouts";


import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



export default function Home() {
  return (
    <JobsLayout title={"AE | Beneficios "} pageDescription={"Beneficios que ofrecemos"}>
         <Box mt={15}>
          <Typography variant='h1' component='h1'>Beneficios que ofrecemos</Typography>
        </Box> 
        <Divider variant="middle" /> 
    </JobsLayout>
  )
}
