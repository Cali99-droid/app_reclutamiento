import { prisma } from '@/server/db/client';

import { apiCon, reclutApi } from "@/api";
import AnnouncementForm from "@/components/jobs/AnnouncementForm";
import { AdminLayout } from "@/components/layouts";

import { IGrado } from "@/interfaces";
import { Box} from "@mui/material";
import { convocatoria } from "@prisma/client";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";



interface Props{
  grados:IGrado[]
  estados:IGrado[]
  job:convocatoria
  
  }


 const ConvocatoriasPage: NextPage<Props> = ({grados,job}) => {
  return (
    <AdminLayout title={"Crear convocatoria "} subTitle={"Publica una nueva concocatoria"}>
      <Box className="fadeIn" display={'flex'} gap={2}>
         
         
     </Box> 
     <AnnouncementForm grados={grados} job={job}  />
        
    </AdminLayout>
  )
}


export const getServerSideProps: GetServerSideProps  = async ({ query }) => {
  let job : convocatoria | null
  const { slug=''} = query;
  

    const id = parseInt(slug.toString())
    
  
  const grados = await apiCon('/grados')
    
  
  if(slug === 'new'){
     const jobTemp = {
      id: 0,
      titulo: "",
      descripcion: "",
      experiencia: 2,
      gradoId: 0,
      estadoId: 1,
      sueldoOfertado:2000,
      vacantes: 1
    }
    job = jobTemp;


  }else{
      if(isNaN(id)){
        return {
          redirect: {
              destination: '/admin/convocatorias',
              permanent: false,
          }
        }
      }
    
       job = await prisma.convocatoria.findUnique({
          where: {
            id
          },
        });
         await prisma.$disconnect()
    
   
  }
    
    if ( !job ) {
      return {
          redirect: {
              destination: '/admin/convocatorias',
              permanent: false,
          }
      }
    }
   return {
       props: {
          grados,
          job
         
       }
   }
}


export default ConvocatoriasPage