import { JobsLayout } from "@/components/layouts";


import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Beneficios } from "@/views/HomePage/Beneficios";



export default function Home() {
  return (
    <JobsLayout title={"AE | Beneficios "} pageDescription={"Beneficios que ofrecemos"}>
      <Box maxWidth={1200} sx={{ margin: 'auto' }} paddingTop={18} >
        <Beneficios />
      </Box>

    </JobsLayout>
  )
}
