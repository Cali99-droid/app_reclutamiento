import { apiCon, reclutApi } from "@/api";
import AnnouncementForm from "@/components/jobs/AnnouncementForm";
import { AdminLayout } from "@/components/layouts";
import { dbJob } from "@/database";
import { getConvocatoriaById } from "@/database/dbJob";
import { IGrado, IJob } from "@/interfaces";
import { Box} from "@mui/material";
import { convocatoria } from "@prisma/client";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";



interface Props{
  grados:IGrado[]
  estados:IGrado[]
  
  }


 const ConvocatoriasPage: NextPage<Props> = ({grados}) => {
  return (
    <AdminLayout title={"Crear convocatoria "} subTitle={"Publica una nueva concocatoria"}>
      <Box className="fadeIn" display={'flex'} gap={2}>
         
         
     </Box> 
     <AnnouncementForm grados={grados}  />
        
    </AdminLayout>
  )
}


export const getServerSideProps: GetServerSideProps  = async ({ query }) => {
  let job : convocatoria | null
  const { id = '', edit=''} = query;
  console.log(query)
  const grados = await apiCon('/grados')



 
  
  if(edit === 'true'){
     job = await getConvocatoriaById(id[0]) ;
    if ( !job ) {
          return {
              redirect: {
                  destination: '/admin/convocatorias',
                  permanent: false,
              }
          }
        }
    }

   return {
       props: {
          grados,
        
         
       }
   }
}

export default ConvocatoriasPage