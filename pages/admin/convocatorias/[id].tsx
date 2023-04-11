import { JobsLayout } from "@/components/layouts";
import { Box,  Divider,IconButton, Typography,  } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {LinearStepper} from "../../../components/announcements";




const AnnouncementPage = () => {

  return (
    <JobsLayout title={"AE | Administrar convocatorias "} pageDescription={"Convocatorias a trabajos en Ancash"}>
        <Box className="fadeIn" mt={15} mb={5} display={'flex'} gap={2}>
                <IconButton
                aria-label="regresar" 
                size="medium"
                onClick={()=>{window.history.back()}}
                >
                    <ArrowBackIcon fontSize="inherit" />
                </IconButton>
            <Box  >
                <Typography variant='h1' component='h1'>Convocatoria: Docente Primaria</Typography>
                <Divider variant="middle" />
            </Box>   
           
        </Box> 
        <LinearStepper/> 
     
        
       
      
  </JobsLayout>
  )
}

export default AnnouncementPage;
