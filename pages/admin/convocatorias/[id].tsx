import { AdminLayout, JobsLayout } from "@/components/layouts";
import { Box,  Divider,IconButton, Typography,  } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ToastContainer, toast } from 'react-toastify';


import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {LinearStepper} from "../../../components/announcements";

import 'react-toastify/dist/ReactToastify.css';


const AnnouncementPage = () => {

  return (
    <AdminLayout title={"Administrar convocatoria "} subTitle={"Listado de postulantes"}>
        
        <LinearStepper/> 
     
    <ToastContainer      />
       
      
  </AdminLayout>
  )
}

export default AnnouncementPage;
