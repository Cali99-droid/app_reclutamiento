import { AdminLayout, JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';
import { jobs } from '../../../database/seed';
import Divider from '@mui/material/Divider';
import { AnnouncementList } from '../../../components/jobs';
import { GetStaticProps, NextPage } from "next";
import { apiCon } from "@/api";
import { IJob } from "@/interfaces";


interface Props{
  convocatorias:IJob[]

  
  }

 const ConvocatoriasPage: NextPage<Props> =({convocatorias})=> {
  return (
    <AdminLayout title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"}>
      <Box className="fadeIn">
        
        <AnnouncementList convocatorias={convocatorias} />
      </Box>
       
    </AdminLayout>


  )
}

export const  getStaticProps: GetStaticProps = async () => {


  const convocatorias = await apiCon('/admin/convocatorias')


   return {
       props: {
        convocatorias
         
       }
   }
}

export default ConvocatoriasPage