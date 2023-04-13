import { AdminLayout } from "@/components/layouts";
import { Box} from "@mui/material";

import { AnnouncementForm } from "@/components/jobs";


export default function ConvocatoriasPage() {
  return (
    <AdminLayout title={"Crear convocatoria "} subTitle={"Publica una nueva concocatoria"}>
      <Box className="fadeIn" display={'flex'} gap={2}>
         
         
     </Box> 
     <AnnouncementForm/>
        
    </AdminLayout>
  )
}