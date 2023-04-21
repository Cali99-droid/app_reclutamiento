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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IJob } from '@/interfaces';
import { reclutApi } from '@/api';


interface Props {
  postulantes: any[]
  convocatoria: IJob
  evaluaciones: evaluacion[]

}

const AnnouncementPage: NextPage<Props> = ({ convocatoria, evaluaciones }) => {
  const router = useRouter();
  const { id } = router.query
  const { data, error } = useSWR<any[]>(`/api/admin/postulantes/${id}`);
  const [postulantes, setPostulantes] = useState<any[]>([]);
  const [status, setStatus] = useState(true)



  useEffect(() => {
    if (data) {
      setPostulantes(data);
    }

  }, [data])







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
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {

        return (

          <Select
            value={parseInt(params.row.estado)}
            label="Rol"
            onChange={(e: SelectChangeEvent<number>) => onStatusUpdated(params.row.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
            sx={{ width: '200px' }}
            disabled={!(convocatoria.estadoId > 1)}
          >
            <MenuItem value={1}> Inscrito </MenuItem>
            <MenuItem value={2}>Apto a Entrevista</MenuItem>
            <MenuItem value={3}> Apto a Evaluación</MenuItem>
            <MenuItem value={4}> Selecionado</MenuItem>

          </Select>
        )
      }
    },
    {
      field: 'actions', headerName: 'Acciones', width: 90,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {
              (convocatoria.estado.id > 1 && params.row.estado > 1) ?
                (




                  <>
                    <Tooltip title="Entrevista" placement="right-start">
                      <IconButton sx={{ color: '#f3f3f3' }} aria-label="evaluar" onClick={() => { handleOpen(params.row.id) }}    >
                        < FactCheckIcon sx={{ color: cyan[600] }} />
                      </IconButton>
                    </Tooltip>
                  </>

                ) : ('cambea')
            }


          </>
        )
      }
    }



  ];


  const rows = postulantes.map((p) => ({
    id: p.postulante.id,
    postulante: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,
    estado: p.postulante.estado_postulante.id,
    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    especialidad: p.postulante.especialidad,
    experiencia: p.postulante.experiencia + ' años',
    sueldo: 'S/ ' + p.postulante.sueldo,

  }))

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

  const onStatusUpdated = async (id: number, newStatus: string) => {

    const previosPostulantes = postulantes.map(p => ({ ...p }));
    const updatedPostulantes = postulantes.map(p => ({
      ...p,
      estado_postulante_id: id === p.id ? parseInt(newStatus) : p.id
    }));


    setPostulantes(updatedPostulantes);

    try {

      await reclutApi.put('/admin/postulantes/1', { id, status: newStatus });

    } catch (error) {
      setPostulantes(previosPostulantes);
      console.log(error);
      alert('No se pudo actualizar el role del usuario');
    }

  }



  return (
    <AdminLayout title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
      <Box>
        <Typography variant="subtitle1">Vacantes: {convocatoria.vacantes}</Typography>
        <Typography variant="subtitle1">Postulantes: {postulantes.length}</Typography>
        <Typography variant="subtitle1">Estado: {convocatoria.estado.nombre}</Typography>
        <Typography variant="subtitle1">Estado: {convocatoria.estado.id}</Typography>
        <Typography variant="subtitle1">Postulantes: {postulantes.length}</Typography>
      </Box>
      <Box sx={{ height: 500, width: '100%' }}>
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
    },
    include: {
      estado: {
        select: { id: true, nombre: true },
      },
      grado: {
        select: { nombre: true },
      },
      _count: {
        select: { postulante_x_convocatoria: true }
      }
    },
  })


  const evaluaciones = await prisma.evaluacion.findMany();
  await prisma.$disconnect()

  return {
    props: { convocatoria, evaluaciones }
  }
}


export default AnnouncementPage;
