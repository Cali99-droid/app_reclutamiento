import { prisma } from '@/server/db/client';


import { GetStaticProps } from "next";



import useSWR from 'swr';
import { useEffect, } from 'react';


import { Grid, Link, Box, Button, IconButton, Typography, Select, MenuItem, SelectChangeEvent, Paper, Tabs, Tab, TextField, Toolbar, AppBar } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
;
import { IJob } from '@/interfaces';



import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react';
import { reclutApi } from '@/api';
import NextLink from 'next/link';
import Modal from '@/components/modal/Modal';
import axios from 'axios';
import { Paperbase } from '@/components/dash';




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
    { field: 'vacantes', headerName: '# Vacantes ', width: 120 },
    { field: 'postulantes', headerName: ' # Postulantes', width: 120 },


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
            sx={{ width: '200px', padding: 1 }}
          >
            <MenuItem value={1}> Abierta </MenuItem>
            <MenuItem value={2}>En evaluación</MenuItem>
            <MenuItem value={3}> Cerrada</MenuItem>

          </Select>

        )
      }
    },
    {
      field: 'actions', headerName: 'Acciones', width: 100,
      sortable: false,
      renderCell: (params) => {
        return (

          <Box display={'flex'} justifyContent={'end'} width={'100%'}>
            <IconButton disabled={params.row.estado > 1} aria-label="evaluar" color='info' onClick={() => { router.push(`/admin/convocatorias/${params.row.id}`) }}  >
              <EditIcon />
            </IconButton>


            <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { handleOpen(params.row.id) }}  >
              <DeleteIcon />
            </IconButton>
          </Box>


        )
      }
    }

  ];


  const rows = convocatorias.map(job => ({
    id: job.id,
    titulo: job.titulo,
    vacantes: job.vacantes,
    estado: job.estado.id,
    jobId: job.id,
    postulantes: job._count.postulante_x_convocatoria,
  }))

  const Navigate = () => {
    return (
      <Tabs value={0} textColor="inherit">
        <Tab label="Users" />
        <Tab label="Sign-in method" />
        <Tab label="Templates" />
        <Tab label="Usage" />
      </Tabs>
    );
  }

  const navigateTo = (url: string) => {
    router.push(url);
  }
  return (
    <Paperbase title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"} >
      <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <span color="inherit" />
              </Grid>
              <Grid item xs>
                <Typography>Listado de convocatorias</Typography>
              </Grid>
              <Grid item>
                <Button
                  size='medium'
                  startIcon={<AddCircleIcon />}

                  onClick={() => navigateTo('/admin/convocatorias/new')}

                >Nuevo</Button>

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box className="fadeIn" padding={4}>

          <Grid
            container
            justifyContent={'end'}

          >
            <Grid item >

            </Grid >
            <Grid item xs={12} sx={{ height: 580, width: '100%' }}>

              <DataGrid
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                rows={rows}
                columns={columns}
                rowHeight={45}
              />
            </Grid>
          </Grid>

          <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
            <Typography >La Convocatoria se eliminará definitivamente</Typography>

          </Modal>
        </Box>
      </Paper>


    </Paperbase>


  )
}

// export const getStaticProps: GetStaticProps = async () => {


//   // const convocatorias = await apiCon('/admin/convocatorias')
//   const convocatorias = await prisma.convocatoria.findMany({
//     include: {
//       estado: {
//         select: { id: true, nombre: true },
//       },
//       grado: {
//         select: { nombre: true },
//       },
//       _count: {
//         select: { postulante_x_convocatoria: true }
//       }
//     },
//   });

//   await prisma.$disconnect()

//   return {
//     props: {
//       convocatorias

//     }
//   }
// }

export default ConvocatoriasPage