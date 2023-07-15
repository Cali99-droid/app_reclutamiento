import { prisma } from '@/server/db/client';


import { AdminLayout, JobsLayout } from "@/components/layouts";
import { AppBar, Box, Button, Chip, Grid, IconButton, Link, List, ListItem, ListItemText, ListSubheader, Paper, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';


import { GetStaticProps, NextPage } from "next";


import { IJob } from '@/interfaces';
import { Paperbase } from '@/components/dash';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useRouter } from 'next/router';
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid';
import { Modal, ModalAlert } from '@/components/modal';
import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { reclutApi } from '@/apies';
import { evaluacion } from '@prisma/client';
import NextLink from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { indigo } from '@mui/material/colors';
import axios from 'axios';


interface Props {
  evaluaciones: any
}
function generateRandom() {
  var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
const EvaluacionesPage: NextPage<Props> = ({ evaluaciones }) => {
  const [tests, setTests] = useState<any[]>(evaluaciones)
  const [id, setId] = useState<Number>()
  const [openAlert, setOpenAlert] = useState(false)
  // useEffect(() => {
  //   setTests(evaluaciones);


  // }, [evaluaciones])

  const router = useRouter();

  const [evaluacion, setEvaluacion] = useState('')
  const onEvalChange = (event: ChangeEvent<HTMLInputElement>) => {

    setEvaluacion(event.target.value);

  }
  const agregarEvaluacion = async (evaluacion: string) => {
    const { data } = await reclutApi.post<any>('/admin/evaluaciones/create', { evaluacion });
    setTests([...tests, data.ev])

  }
  const editarEvaluacion = async () => {
    const { data } = await reclutApi.put<any>('/admin/evaluaciones/create', { evaluacion, id });

    const testsAct = [...tests.map(t => {
      if (t.id === data.ev.id) {
        t.nombre = data.ev.nombre
      }
      return t;
    })]
    setTests(testsAct)

  }
  const handleConfirm = () => {
    if (evaluacion.length === 0) {
      toast.warning('Complete correctamente todos los campos')
    };
    if (id) {

      editarEvaluacion()
      toast.success('Actualizado con éxito')
    } else {
      agregarEvaluacion(evaluacion);
      toast.success('Actualizado con éxito')
    }

    setOpen(false)
  }

  const handleEdit = (id: number, evaluacion: string) => {
    setOpen(true)
    setId(id)
    setEvaluacion(evaluacion)

  }
  const handleClose = () => {
    setOpen(false);
    setOpenAlert(false)
    setId(0);
    setEvaluacion('');

  }
  const hadleOpenAlert = (id: number, evaluacion: string) => {
    setOpenAlert(true)
    setEvaluacion(evaluacion)
    setId(id)
  }
  const handleConfirmDelete = async () => {

    try {
      const { data } = await reclutApi.delete<any>(`/admin/evaluaciones/${id}`);
      toast.success('Eliminado Correctamente')
      const testsAct = tests.filter(t => t.id !== id);
      setTests(testsAct)
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message)
        return;
      }
      console.log(error)
      return;

    }



  }

  const [open, setOpen] = useState(false)
  const matches = useMediaQuery('(min-width:600px)');
  const columns: GridColDef[] = [

    {
      field: 'nombre', headerName: 'Nombre', width: 320,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/admin/evaluaciones/items/${row.id}`} passHref legacyBehavior>
            <Link underline='always'>
              {row.nombre}
            </Link>
          </NextLink>
        )
      }

    },
    {
      field: 'action',
      headerName: 'Acciones',
      width: 250,
      renderCell: (params) => {
        return (
          <Box display={'flex'} justifyContent={'end'} width={'100%'}>
            <IconButton disabled={params.row.postulantes > 0} aria-label="editar" color='info' onClick={() => { handleEdit(params.row.id, params.row.nombre) }}  >
              <EditIcon />
            </IconButton>


            <IconButton disabled={params.row.postulantes > 0} color='error' aria-label="delete" onClick={() => { hadleOpenAlert(params.row.id, params.row.nombre) }}  >
              <DeleteIcon />
            </IconButton>
          </Box>

        )
      }
    }

  ];
  const rows = tests.map((ev: any) => ({
    id: ev.id,
    nombre: ev.nombre,
  }))
  return (
    <Paperbase title={"Administrar Evaluaciones "} subTitle={"Listado de Evaluaciones"}>
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
                <Typography>Listado de Evaluaciones</Typography>
              </Grid>
              <Grid item>
                <Button
                  size='medium'
                  startIcon={<AddCircleIcon />}

                  onClick={() => setOpen(true)}

                >Nuevo</Button>

              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Box className="fadeIn" padding={4} sx={{ height: 580 }} width={'100%'} textAlign={'center'}>

          <DataGrid
            // getRowHeight={() => 'auto'}

            getRowId={(row: any) => generateRandom()}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            columns={columns}
            rows={rows} />
        </Box>
      </Paper>

      <Modal title={'Guardar Evaluación'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>

        <Box display={'flex'} flexDirection={'column'} gap={2}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, },
          }}
          noValidate
          autoComplete="on" >

          <TextField value={evaluacion} id="outlined-basic" label="Nombre de la evaluación" variant="outlined" onChange={onEvalChange}
          />
        </Box>

      </Modal>
      <Modal title={'¿Estas seguro de eliminar la evaluación?'} open={openAlert} handleClose={handleClose} handleConfirm={handleConfirmDelete}>
        <Typography>{`Se eliminará la evaluación: ${evaluacion}`}</Typography>

      </Modal>
    </Paperbase >


  )
}

export const getStaticProps: GetStaticProps = async () => {



  const evaluaciones = await prisma.test.findMany();

  await prisma.$disconnect()

  return {
    props: {
      evaluaciones

    },
    revalidate: 1,
  }
}

export default EvaluacionesPage