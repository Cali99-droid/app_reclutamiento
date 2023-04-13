import { AdminLayout, JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { jobs } from '../../../database/seed';
import Divider from '@mui/material/Divider';
import { AnnouncementList } from '../../../components/jobs';


export default function ConvocatoriasPage() {
  return (
    <AdminLayout title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"}>
      <Box className="fadeIn">
        
        <AnnouncementList />
      </Box>
       
    </AdminLayout>
  )
}