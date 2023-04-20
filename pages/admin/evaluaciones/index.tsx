import { prisma } from '@/server/db/client';


import { AdminLayout, JobsLayout } from "@/components/layouts";
import { Box, Button, List, ListItem, ListItemText, ListSubheader, Typography } from '@mui/material';


import { GetStaticProps, NextPage } from "next";


import { IJob } from '@/interfaces';


interface Props {
  convocatorias: IJob[]
}

const EvaluacionesPage: NextPage<Props> = ({ }) => {

  return (
    <AdminLayout title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"}>
      <Box className="fadeIn">
        <h1>Lista de evaluaciones</h1>
        <Button>Nueva </Button>
      </Box>
      <Box padding={5} display={'flex'} justifyContent={'center'} gap={20}>
        <Box>
          <Typography>Evaluación:</Typography>
          <Typography>Titulo de la evaluacion</Typography>
        </Box>
        <Box>
          <Box display={'flex'} justifyContent={'space-between'} mb={2} width={300}>
            <Typography>Cirterios de evaluación</Typography>
            <Button>Agregar </Button>
          </Box>
          <List
            sx={{
              width: '100%',
              maxWidth: 400,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >

            <li >
              <ul>
                <ListSubheader>{ }</ListSubheader>

                <ListItem >
                  <ListItemText />
                </ListItem>

              </ul>
            </li>

          </List>
        </Box>

      </Box>

    </AdminLayout >


  )
}

export const getStaticProps: GetStaticProps = async () => {


  // const convocatorias = await apiCon('/admin/convocatorias')
  // const convocatorias = await prisma.convocatoria.findMany({
  //   include: {
  //     estado: {
  //       select: { nombre: true },
  //     },
  //     grado: {
  //       select: { nombre: true },
  //     },
  //     _count: {
  //       select: { postulante_x_convocatoria: true }
  //     }
  //   },
  // });

  // await prisma.$disconnect()

  return {
    props: {


    }
  }
}

export default EvaluacionesPage