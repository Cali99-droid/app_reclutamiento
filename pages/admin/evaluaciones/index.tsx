import { prisma } from '@/server/db/client';


import { AdminLayout, JobsLayout } from "@/components/layouts";
import { AppBar, Box, Button, Chip, FormControl, Grid, IconButton, InputLabel, Link, List, ListItem, ListItemText, ListSubheader, MenuItem, Paper, Select, SelectChangeEvent, TextField, Toolbar, Typography, useMediaQuery } from '@mui/material';


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

import NextLink from 'next/link';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { indigo } from '@mui/material/colors';
import axios from 'axios';
import { categoria } from '@prisma/client';


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
  const [rolId, setRolId] = useState(0)
  const [categoriaId, setCategoriaId] = useState(0)
  const onEvalChange = (event: ChangeEvent<HTMLInputElement>) => {

    setEvaluacion(event.target.value);

  }
  const agregarEvaluacion = async (evaluacion: string) => {
    const { data } = await reclutApi.post<any>('/admin/evaluaciones/create', { evaluacion, rolId, categoriaId });
    setTests([...tests, data.ev])
    handleClose()
  }
  const editarEvaluacion = async () => {
    const { data } = await reclutApi.put<any>('/admin/evaluaciones/create', { evaluacion, id, rolId, categoriaId });

    const testsAct = [...tests.map(t => {
      if (t.id === data.ev.id) {
        t.nombre = data.ev.nombre
        t.rol.name = data.ev.rol.name
        t.rol.id = data.ev.rol.id
        t.categoria_id = data.ev.categoria_id
        t.categoria.nombre = data.ev.categoria.nombre
      }
      return t;
    })]
    setTests(testsAct)
    handleClose()
  }
  const handleConfirm = () => {
    if (evaluacion.length === 0) {
      toast.warning('Complete correctamente todos los campos')
      return;
    };
    if (rolId <= 0) {
      toast.warning('Complete correctamente todos los campos')
      return;
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

  const handleEdit = (id: number, evaluacion: string, rolId: number, categoriaId: number) => {
    setOpen(true)
    setId(id)
    setEvaluacion(evaluacion)
    setRolId(rolId)
    setCategoriaId(categoriaId)

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
      field: 'responsable', headerName: 'Responsable', width: 300,
    },
    {
      field: 'categoria', headerName: 'Categoria', width: 200,
    },
    {
      field: 'items', headerName: 'N° Items', width: 90,
    },
    {
      field: 'action',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => {
        return (
          <Box display={'flex'} justifyContent={'end'} width={'100%'}>
            <IconButton disabled={params.row.postulantes > 0} aria-label="editar" color='info' onClick={() => { handleEdit(params.row.id, params.row.nombre, params.row.rolId, params.row.categoriaId) }}  >
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
  const getResponsable = (rol: string) => {
    switch (rol) {
      case 'docente':
        return 'Jurado Docente'

      case 'administrativo':
        return 'Jurado Administrativo'

      case 'entrevista':
        return 'Jefe RRHH'

      default:
        break;
    }

  }
  console.log(tests)
  const rows = tests.map((ev: any) => ({
    id: ev.id,
    nombre: ev.nombre,
    responsable: getResponsable(ev.categoria.nombre),
    items: ev._count.item,
    rolId: ev.rol.id,
    categoriaId: ev.categoria_id,
    categoria: ev.categoria.nombre,

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
          {
            tests.length > 0 ? (
              <DataGrid
                // getRowHeight={() => 'auto'}

                getRowId={(row: any) => generateRandom()}
                localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows} />
            ) : (
              <Typography>No hay datos</Typography>
            )
          }

        </Box>
      </Paper>

      <Modal title={'Guardar Evaluación'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>

        <Box display={'flex'} flexDirection={'column'} gap={2}
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, },
          }}
          noValidate
          autoComplete="on" minWidth={200}>

          <TextField value={evaluacion} id="outlined-basic" label="Nombre de la evaluación" variant="outlined" onChange={onEvalChange}
          />
          {/* <FormControl >
            <InputLabel id="select-rol">Rol</InputLabel>
            <Select
              labelId="select-rol"
              id="select-rol"
              value={rolId || 0}
              label="Age"
              onChange={(e: SelectChangeEvent<number>) => setRolId(parseInt(e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
            >


              <MenuItem value={0} disabled>Seleccione</MenuItem>
              <MenuItem value={3}>Jurado Docente</MenuItem>
              <MenuItem value={4}>Jurado Administrativo</MenuItem>
              <MenuItem value={5}>Entrevista RRHH</MenuItem>

            </Select>
          </FormControl> */}

          <FormControl >
            <InputLabel id="select-rol">Categoria</InputLabel>
            <Select
              labelId="select-rol"
              id="select-rol"
              value={categoriaId || 0}
              label="Age"
              onChange={(e: SelectChangeEvent<number>) => setCategoriaId(parseInt(e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
            >
              <MenuItem value={0} disabled>Seleccione</MenuItem>
              <MenuItem value={1}>Administrativo</MenuItem>
              <MenuItem value={2}>Docente</MenuItem>
              <MenuItem value={3}>Entrevista</MenuItem>

            </Select>
          </FormControl>

        </Box>

      </Modal>
      <Modal title={'¿Estas seguro de eliminar la evaluación?'} open={openAlert} handleClose={handleClose} handleConfirm={handleConfirmDelete}>
        <Typography>{`Se eliminará la evaluación: ${evaluacion}`}</Typography>

      </Modal>
    </Paperbase >


  )
}

export const getStaticProps: GetStaticProps = async () => {



  const evaluaciones = await prisma.test.findMany({
    include: {
      rol: true,
      categoria: true,
      _count: {
        select: {
          item: true,
        }
      }
    }
  });

  await prisma.$disconnect()

  return {
    props: {
      evaluaciones

    },
    revalidate: 1,
  }
}

export default EvaluacionesPage