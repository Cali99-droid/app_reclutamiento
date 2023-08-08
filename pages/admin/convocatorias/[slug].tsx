import { prisma } from '@/server/db/client';

import { apiCon } from "@/apies";
import AnnouncementForm from "@/components/jobs/AnnouncementForm";


import { IGrado, IJob } from "@/interfaces";
import { Box } from "@mui/material";
import { convocatoria } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { Paperbase } from '@/components/dash';
import "react-toastify/dist/ReactToastify.css";


interface Props {
  grados: IGrado[]
  estados: IGrado[]
  job: IJob

}


const ConvocatoriasPage: NextPage<Props> = ({ grados, job }) => {
  return (
    <Paperbase title={"Crear convocatoria "} subTitle={"Publica una nueva concocatoria"} >
      <Box className="fadeIn" display={'flex'} gap={2}>


      </Box>
      <AnnouncementForm grados={grados} job={job} />

    </Paperbase>
  )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let jobSer: convocatoria | null
  const { slug = '' } = query;


  const id = parseInt(slug.toString())


  const grados = await apiCon('/grados')


  if (slug === 'new') {
    const jobTemp = {
      id: 0,
      titulo: "",
      descripcion: "",
      experiencia: 2,
      gradoId: 0,
      estadoId: 1,
      sueldoOfertado: 2000,
      vacantes: 1,
      categoria_id: null,
      vigencia: null,
      img: null,
      slug: null
    }
    jobSer = jobTemp;


  } else {
    if (isNaN(id)) {
      return {
        redirect: {
          destination: '/admin/convocatorias',
          permanent: false,
        }
      }
    }

    jobSer = await prisma.convocatoria.findUnique({
      where: {
        id
      },
    });
    await prisma.$disconnect()


  }

  if (!jobSer) {
    return {
      redirect: {
        destination: '/admin/convocatorias',
        permanent: false,
      }
    }
  }
  const job = JSON.parse(JSON.stringify(jobSer))
  return {
    props: {
      grados,
      job

    }
  }
}


export default ConvocatoriasPage