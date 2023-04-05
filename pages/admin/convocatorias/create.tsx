import { JobsLayout } from "@/components/layouts";
import { Box, Button, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import { jobs } from '../../../database/seed';
import Divider from '@mui/material/Divider';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AnnouncementForm } from "@/components/jobs";


export default function ConvocatoriasPage() {
  return (
    <JobsLayout title={"AE | Administrar convocatorias "} pageDescription={"Convocatorias a trabajos en Ancash"}>
      <Box className="fadeIn" mt={15} display={'flex'} gap={2}>
         
          <IconButton 
          aria-label="regresar" 
          size="medium"
          onClick={()=>{window.history.back()}}
          >
                <ArrowBackIcon fontSize="inherit" />
        </IconButton>
            <Box  >
            <Typography variant='h1' component='h1'>Nueva Convocatoria</Typography>
            <Divider variant="middle" />
            </Box>   
     </Box> 
     <AnnouncementForm/>
        
    </JobsLayout>
  )
}