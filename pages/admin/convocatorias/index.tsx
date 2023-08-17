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
import { DataGrid, GridColDef, GridToolbar, esES } from '@mui/x-data-grid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import 'moment/locale/es';
import { useSweetAlert } from '@/context/sweet/SweetAlertContext';
import Swal from 'sweetalert2';
import { useJobs } from '@/hooks';


moment.locale('es');
interface Props {

  convos: IJob[]
}


const ConvocatoriasPage: NextPage<Props> = ({ convos }) => {

  const { jobs } = useJobs('/admin/convocatorias')

  // const [convocatorias, setConvocatorias] = useState<IJob[]>(jobs)
  // console.log(convocatorias)
  const matches = useMediaQuery('(min-width:600px)');


  {/*---------------------------------------* */ }
  const router = useRouter();
  const [open, setOpen] = useState(false)

  const [id, setId] = useState(0)
  const handleOpen = (id: number) => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async (idConvo: number) => {



    // const result = await showAlert('Confirmación', '¿Estás seguro de eliminar la convocatoria??');
    // if (result) {
    //   // Lógica a realizar si el usuario confirma la acción
    //   deleteJob();
    //   console.log('Acción confirmada');
    // } else {
    //   // Lógica a realizar si el usuario cancela la acción
    //   console.log('Acción cancelada');
    // }

    Swal.fire({
      title: '¿Esta seguro de eliminar la convocatoria? ',
      text: 'Se eliminará la convocatoria',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setId(idConvo)
        deleteJob(idConvo);
      } else {
        console.log('no borrar')
      }
    });




  };
  const refreshData = () => {
    router.replace(router.asPath)
  }
  const deleteJob = async (id: number) => {


    try {
      reclutApi({
        url: '/admin/convocatorias',
        method: 'DELETE',
        data: id
      })
      // .then(() => {
      //   const newConvos = jobs.filter(c => c.id !== id);
      //   setConvocatorias(newConvos);
      // });



    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        // setConvocatorias(convocatorias)
        return {
          hasError: true,
          message: error.response?.data.message
        }
      }
      // setConvocatorias(convocatorias)
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
      field: 'titulo', headerName: 'Convocatoria', width: 300,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/admin/convocatorias/convocatoria/${row.idConv}`} passHref legacyBehavior>
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
      width: 140,
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
            <IconButton disabled={params.row.postulantes > 0} aria-label="editar" color='info' onClick={() => { router.push(`/admin/convocatorias/${params.row.idConv}`) }}  >
              <EditIcon />
            </IconButton>


            <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { handleConfirm(params.row.idConv) }}  >
              <DeleteIcon />
            </IconButton>
          </Box>


        )
      }
    }

  ];

  const formatoNombre = (titulo: string) => {

    return titulo.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

  }
  const rows = jobs.map((job, index) => ({
    id: index + 1,
    idConv: job.id,
    titulo: formatoNombre(job.titulo),
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

      <Paper sx={matches ? { maxWidth: 1100, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }}>
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
        <Box className="fadeIn" padding={2} height={matches ? 600 : 650} width={'100%'} textAlign={'center'}>



          <DataGrid

            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
          />


          {/* <Modal title={'¿ Esta seguro de eliminar la convocatoria ?'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
            <Typography >La Convocatoria se eliminará definitivamente</Typography></Modal> */}


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

    },
    revalidate: 1,
  }
}

export default ConvocatoriasPage
