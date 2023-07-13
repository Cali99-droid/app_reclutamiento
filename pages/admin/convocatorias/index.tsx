import { reclutApi } from '@/apies';
import { prisma } from '../../../server/db/client';
import axios from 'axios';
import moment from 'moment';

import { Paperbase } from '@/components/dash';
import Modal from '@/components/modal/Modal';

import { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { useState } from 'react';

import { IJob } from '@/interfaces';

import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Link, Box, Button, IconButton, Typography, Paper, Toolbar, AppBar, Chip } from '@mui/material';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'moment/locale/es';

moment.locale('es');
interface Props {

  convos: IJob[]
}


const ConvocatoriasPage: NextPage<Props> = ({ convos }) => {
  console.log(convos)
  const [convocatorias, setConvocatorias] = useState(convos)
  const matches = useMediaQuery('(min-width:600px)');


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
        const newConvos = convocatorias.filter(c => c.id !== id);
        setConvocatorias(newConvos);
      });



    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        setConvocatorias(convocatorias)
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      setConvocatorias(convocatorias)
      return {
        hasError: true,
        message: 'No se pudo eliminar la convocatoria - intente de nuevo'

      }

    }
    handleClose()

  }


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'N°', width: 50 },
    {
      field: 'titulo', headerName: 'Convocatoria', width: 320,
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
    { field: 'vigencia', headerName: 'Vigente hasta ', width: 160 },
    { field: 'vacantes', headerName: '# Vacantes ', width: 120 },
    { field: 'postulantes', headerName: ' # Postulantes', width: 120 },


    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {
        const fechaHoy = new Date();
        return (
          params.row.vigenciad >= fechaHoy ?
            (<Chip label={`${params.row.estado}`} color={params.row.estado === 'abierta' ? 'success' : params.row.estado === 'cerrada' ? 'error' : 'warning'} variant="outlined" />)


            :
            params.row.estado === 'abierta' ? (<Chip label={`Vencido`} color={'error'} variant="outlined" />)
              : (<Chip label={`${params.row.estado}`} color={params.row.estado === 'abierta' ? 'success' : params.row.estado === 'cerrada' ? 'error' : 'warning'} variant="outlined" />)



        )
      }
    },
    {
      field: 'actions', headerName: 'Acciones', width: 100,
      sortable: false,
      renderCell: (params) => {
        return (

          <Box display={'flex'} justifyContent={'end'} width={'100%'}>
            <IconButton disabled={params.row.postulantes > 0} aria-label="evaluar" color='info' onClick={() => { router.push(`/admin/convocatorias/${params.row.id}`) }}  >
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


  const rows = convocatorias.map((job, index) => ({
    id: job.id,
    titulo: job.titulo,
    vacantes: job.vacantes,
    estado: job.estado.nombre,
    jobId: job.id,
    vigencia: moment(job.vigencia).add(1, 'days').format('LL'),
    vigenciad: moment(job.vigencia).add(1, 'days'),
    postulantes: job._count.postulante_x_convocatoria,
  }))


  const navigateTo = (url: string) => {
    router.push(url);
  }

  return (

    <Paperbase title={"Administrar convocatorias "} subTitle={"Listado de convocatorias"} >

      <Paper sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }}>
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
        <Box className="fadeIn" padding={4} sx={{ height: 580 }} width={'100%'} textAlign={'center'}>



          <DataGrid
            getRowHeight={() => 'auto'}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}

          />


          <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
            <Typography >La Convocatoria se eliminará definitivamente</Typography>

          </Modal>
        </Box>
      </Paper>

    </Paperbase >


  )
}

export const getStaticProps: GetStaticProps = async () => {


  // const convocatorias = await apiCon('/admin/convocatorias')
  const convocatorias = await prisma.convocatoria.findMany({
    select: {
      id: true,
      titulo: true,
      vacantes: true,
      vigencia: true,
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

    orderBy: {
      id: 'desc'
    }
  });

  await prisma.$disconnect()
  const convos = JSON.parse(JSON.stringify(convocatorias))
  return {
    props: {
      convos

    }
  }
}

export default ConvocatoriasPage
