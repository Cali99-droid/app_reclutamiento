import { prisma } from '@/server/db/client';


import { AdminLayout, JobsLayout } from "@/components/layouts";


import { AnnouncementList } from '../../../components/jobs';
import { GetStaticProps } from "next";



import useSWR from 'swr';
import { useEffect, } from 'react';


import { Grid, Link, Box, Button, IconButton, Typography, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { red } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
;
import { IJob } from '@/interfaces';
import { NextPage } from 'next';


import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react';
import { reclutApi } from '@/api';
import NextLink from 'next/link';
import Modal from '@/components/modal/Modal';
import axios from 'axios';
import { postulante } from '@prisma/client';




const ConvocatoriasPage = () => {
  const { data, error } = useSWR<IJob[]>('/api/admin/convocatorias');
  const [convocatorias, setConvocatorias] = useState<IJob[]>([]);


  useEffect(() => {
    if (data) {
      setConvocatorias(data);
    }
  }, [data])







  {/*---------------------------------------* */ }
  const router = useRouter();
  const [open, setOpen] = useState(false)

  const [id, setId] = useState(0)
  const handleOpen = (id: number) => {
    setOpen(true);
    setId(id)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    const datos = await deleteJob();
    console.log(datos)

  };
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const deleteJob = async () => {


    try {
      reclutApi({
        url: '/admin/convocatorias',
        method: 'DELETE',
        data: id
      }).then(() => {
        refreshData()
      });


    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }

      return {
        hasError: true,
        message: 'No se pudo crear el usuario - intente de nuevo'
      }
    }
    handleClose()

  }
  if (!data && !error) return (<></>);
  const onStatusUpdated = async (id: number, newStatus: string) => {

    const previosConvocatorias = convocatorias.map(convocatoria => ({ ...convocatoria }));
    const updatedConvocatorias = convocatorias.map(convocatoria => ({
      ...convocatoria,
      estadoId: id === convocatoria.id ? parseInt(newStatus) : convocatoria.id
    }));


    setConvocatorias(updatedConvocatorias);

    try {

      await reclutApi.put('/admin/job', { id, status: newStatus });

    } catch (error) {
      setConvocatorias(previosConvocatorias);
      console.log(error);
      alert('No se pudo actualizar el role del usuario');
    }

  }


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'titulo', headerName: 'Convocatoria', width: 200,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/admin/convocatorias/convocatoria/${row.id}`} passHref legacyBehavior>
            <Link underline='always'>
              {row.titulo}
            </Link>
          </NextLink>
        )
      }

    },
    { field: 'vacantes', headerName: 'Vacantes disponibles', width: 160 },
    { field: 'postulantes', headerName: 'Postulantes', width: 160 },
    { field: 'sueldo', headerName: 'Sueldo Ofertado', width: 180 },
    { field: 'experiencia', headerName: 'Experiencia Mínima', width: 180 },
    { field: 'grado', headerName: 'Grado Mínimo', width: 180 },
    // { field: 'col3', headerName: 'Numero de Postulantes', width: 180 },
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
          >
            <MenuItem value={1}> Abierta </MenuItem>
            <MenuItem value={2}>En evaluación</MenuItem>
            <MenuItem value={3}> Cerrada</MenuItem>

          </Select>
        )
      }
    },
    {
      field: 'actions', headerName: 'Acciones', width: 200,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton disabled={params.row.estado > 1} aria-label="evaluar" color='info' onClick={() => { router.push(`/admin/convocatorias/${params.row.id}`) }}  >
              <EditIcon />
            </IconButton>


            <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { handleOpen(params.row.id) }}  >
              <DeleteIcon />
            </IconButton>
          </>
        )
      }
    }

  ];


  const rows = convocatorias.map(job => ({
    id: job.id,
    titulo: job.titulo,
    vacantes: job.vacantes,
    estado: job.estado.id,
    sueldo: 'S/' + job.sueldoOfertado,
    experiencia: job.experiencia.toString() + ' ' + 'Años',
    grado: job.grado.nombre.toLocaleUpperCase(),
    jobId: job.id,
    postulantes: job._count.postulante_x_convocatoria,
  }))



  const navigateTo = (url: string) => {
    router.push(url);
  }
  return (
    <AdminLayout title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"}>
      <Box className="fadeIn">

        <Grid
          container
          spacing={4}
          marginTop={'.1rem'}
          justifyContent={'end'}
        >
          <Grid item >
            <Button
              size='medium'
              startIcon={<AddCircleIcon />}

              onClick={() => navigateTo('/admin/convocatorias/new')}

            >Nuevo</Button>
          </Grid >
          <Grid item xs={12} sx={{ height: 650, width: '100%' }}>

            <DataGrid
              rows={rows}
              columns={columns}

            />
          </Grid>
        </Grid>

        <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
          <Typography >La Convocatoria se eliminará definitivamente</Typography>

        </Modal>
      </Box>

    </AdminLayout>


  )
}

export const getStaticProps: GetStaticProps = async () => {


  // const convocatorias = await apiCon('/admin/convocatorias')
  const convocatorias = await prisma.convocatoria.findMany({
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
  });

  await prisma.$disconnect()

  return {
    props: {
      convocatorias

    }
  }
}

export default ConvocatoriasPage