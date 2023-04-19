import { prisma } from '@/server/db/client';


import { AdminLayout, JobsLayout } from "@/components/layouts";
import { Box } from "@mui/material";

import { AnnouncementList } from '../../../components/jobs';
import { GetStaticProps, NextPage } from "next";


import { IJob } from '@/interfaces';


interface Props {
  convocatorias: IJob[]
}

const ConvocatoriasPage: NextPage<Props> = ({ convocatorias }) => {

  return (
    <AdminLayout title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"}>
      <Box className="fadeIn">

        <AnnouncementList convocatorias={convocatorias} />
      </Box>

    </AdminLayout>


  )
}

export const getStaticProps: GetStaticProps = async () => {


  // const convocatorias = await apiCon('/admin/convocatorias')
  const convocatorias = await prisma.convocatoria.findMany({
    include: {
      estado: {
        select: { nombre: true },
      },
      grado: {
        select: { nombre: true },
      }
    },
  });
  console.log(convocatorias)
  await prisma.$disconnect()

  return {
    props: {
      convocatorias

    }
  }
}

export default ConvocatoriasPage