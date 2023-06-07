import { JobsLayout } from "@/components/layouts";


import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { How } from "@/views/HomePage/How";



export default function Home() {
  return (
    <JobsLayout title={"AE | Docentes "} pageDescription={"Convocarotia a Docentes en Ancash"}>
      <Box sx={{ margin: 'auto' }} paddingTop={18} >

        <Box  >
          <How />
        </Box>
      </Box>

    </JobsLayout>
  )
}
