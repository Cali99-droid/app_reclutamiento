import { AdminLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import 'react-toastify/dist/ReactToastify.css';
import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, Box, Typography } from '@mui/material';
import { convocatoria } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import NextLink from 'next/link';


interface Props {
  postulantes: any[]
  convocatoria: convocatoria

}

const AnnouncementPage: NextPage<Props> = ({ postulantes, convocatoria }) => {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'postulante',
      headerName: 'Postulante',
      width: 250,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/postulant/${row.id}`} passHref legacyBehavior>
            <Link underline='always'>
              {row.postulante}
            </Link>
          </NextLink>
        )
      }
    },

    {
      field: 'edad',
      headerName: 'Edad',
      width: 150,

    },
    {
      field: 'especialidad',
      headerName: 'Especialidad',
      width: 150,

    },
    {
      field: 'experiencia',
      headerName: 'Años de Experiencia',
      width: 150,

    },
    {
      field: 'sueldo',
      headerName: 'Sueldo Pretendido',
      width: 150,

    },


  ];


  const rows = postulantes.map((p) => ({
    id: p.id,
    postulante: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,

    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    especialidad: p.postulante.especialidad,
    experiencia: p.postulante.experiencia + ' años',
    sueldo: 'S/ ' + p.postulante.sueldo,

  }))
  return (
    <AdminLayout title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
      <Box>
        <Typography variant="subtitle1">Vacantes: {convocatoria.vacantes}</Typography>
        <Typography variant="subtitle1">Postulantes: {postulantes.length}</Typography>
      </Box>
      <Box sx={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}

        />
      </Box>


    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;
  const convocatoria = await prisma.convocatoria.findUnique({
    where: {
      id: parseInt(id.toString())
    }
  })
  const listaPostulantes = await prisma.postulante_x_convocatoria.findMany({
    where: {
      convocatoria_id: parseInt(id.toString())
    },
    include: {
      postulante: {
        include: {
          persona: true
        }
      }
    },
  });
  const postulantes = JSON.parse(JSON.stringify(listaPostulantes))
  console.log(convocatoria)


  return {
    props: { postulantes, convocatoria }
  }
}


export default AnnouncementPage;
