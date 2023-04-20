import NextLink from 'next/link';
import { AdminLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';

import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Link, Box, Typography, IconButton, Tooltip, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { convocatoria, evaluacion } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { cyan } from '@mui/material/colors';
import Modal from '@/components/modal/Modal';
import { useState } from 'react';
import { useRouter } from 'next/router';


interface Props {
  postulantes: any[]
  convocatoria: convocatoria
  evaluaciones: evaluacion[]

}

const AnnouncementPage: NextPage<Props> = ({ postulantes, convocatoria, evaluaciones }) => {

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
      width: 100,

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
      field: 'puntajeEntr',
      headerName: 'Puntaje Entrevista',
      width: 150,

    },
    {
      field: 'puntajeJur',
      headerName: 'Puntaje Jurado',
      width: 150,

    },
    {
      field: 'total',
      headerName: 'Total',
      width: 90,

    },
    {
      field: 'actions', headerName: 'Acciones', width: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Evaluar" placement="right-start">
              <IconButton sx={{ color: '#f3f3f3' }} aria-label="evaluar" onClick={() => { handleOpen(params.row.id) }}    >
                < FactCheckIcon sx={{ color: cyan[600] }} />
              </IconButton>
            </Tooltip>

          </>
        )
      }
    }



  ];


  const rows = postulantes.map((p) => ({
    id: p.id,
    postulante: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,

    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    especialidad: p.postulante.especialidad,
    experiencia: p.postulante.experiencia + ' años',
    sueldo: 'S/ ' + p.postulante.sueldo,

  }))
  const router = useRouter();
  const [idEv, setIdEv] = useState<string | number>('');
  const [idPos, setIdPos] = useState<string | number>('');
  const [open, setOpen] = useState(false)
  const handleOpen = (id: number) => {
    setOpen(true);
    setIdPos(id)

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (idEv === 1) {
      router.push(`/admin/evaluaciones/entrevista/${idPos}`)
    } else {
      router.push(`/admin/evaluaciones/jurado/${idPos}`)
    }



  };
  const handleChange = (event: SelectChangeEvent<typeof idEv>) => {
    setIdEv(event.target.value);

  };





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

      <Modal title={'Seleccione el tipo de evaluación'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
        <Box mt={3} mb={3}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={idEv}
              label="Evaluacion"
              onChange={handleChange}
            >

              {
                evaluaciones.map(ev => (
                  <MenuItem key={ev.id} value={ev.id}>{ev.nombre.toLocaleUpperCase()}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>

      </Modal>
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
  const evaluaciones = await prisma.evaluacion.findMany();
  await prisma.$disconnect()
  console.log(evaluaciones)
  return {
    props: { postulantes, convocatoria, evaluaciones }
  }
}


export default AnnouncementPage;
