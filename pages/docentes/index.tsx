import { JobsLayout } from "@/components/layouts";


import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



export default function Home() {
  return (
    <JobsLayout title={"AE | Docentes "} pageDescription={"Convocarotia a Docentes en Ancash"}>
         <Box mt={15}>
          <Typography variant='h1' component='h1'>Docentes</Typography>
        </Box> 
        <Divider variant="middle" /> 
    </JobsLayout>
  )
}
