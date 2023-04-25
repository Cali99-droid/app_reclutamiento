import NextLink from 'next/link';
import { AdminLayout } from "@/components/layouts";
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { Link, Box, Typography, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent, Button, DialogActions, DialogContent, Chip } from '@mui/material';
import { evaluacion, evaluacion_x_postulante, postulante } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import TaskTwoToneIcon from '@mui/icons-material/TaskTwoTone';
import { cyan } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { IJob } from '@/interfaces';
import { reclutApi } from '@/api';
import { ModalAptitud, ModalEntrevista } from '@/components/modal';
import RatingFrom from '@/components/modal/RatingForm';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import ModalClase from '../../../../components/modal/ModalClase';


interface Props {
  postulantes: postulante[]
  convocatoria: IJob
  evaluaciones: evaluacion[]

}

const AnnouncementPage: NextPage<Props> = ({ convocatoria, evaluaciones }) => {
  const router = useRouter();
  const { id } = router.query
  const { data, error } = useSWR<any[]>(`/api/admin/postulantes/${id}`);

  const [postulantes, setPostulantes] = useState<any[]>([]);
  const [status, setStatus] = useState(true)
  const { criterios, calcularTotal, limpiarCriterios } = useContext(PostContext);
  const [total, setTotal] = useState(0)



  useEffect(() => {
    if (data) {
      // const newPost = data?.sort((x, y) => x.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje) - y.postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje)).reverse()
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
      headerName: convocatoria.categoria_id === 1 ? 'Puntaje Jurado' : 'Puntaje Clase Modelo',
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
            label="Estado"
            onChange={(e: SelectChangeEvent<number>) => onStatusUpdated(params.row.idCp, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
            sx={{ width: '200px' }}
            disabled={!(convocatoria.estadoId > 1)}
          >
            <MenuItem value={1}> Inscrito </MenuItem>
            <MenuItem value={2}> Apto a Entrevista</MenuItem>
            <MenuItem value={3}> Apto a Evaluación</MenuItem>
            <MenuItem value={4}> No Interesa </MenuItem>
            <MenuItem value={5}> Interesante </MenuItem>
            <MenuItem value={6}> Selecionado</MenuItem>

          </Select>
        )
      }
    },
    {
      field: 'actions', headerName: 'Evaluar', width: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            {
              (convocatoria.estado.id > 1 && convocatoria.categoria_id == 2) ?
                (


                  <>
                    <Tooltip title="Evaluar Entrevista" placement="right-start">
                      <IconButton
                        sx={{ color: cyan[600] }}
                        aria-label="evaluar"
                        onClick={() => { handleOpen(params.row.id,) }}
                        disabled={params.row.estado !== 2 || params.row.puntajeEntr > 0}
                      >
                        < FactCheckIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Evaluar Clase" placement="right-start" >
                      <IconButton
                        sx={{ color: cyan[600] }}
                        aria-label="evaluar"
                        onClick={() => { handleOpenClase(params.row.id,) }}
                        disabled={params.row.estado !== 3 || params.row.puntajeJur > 0}

                      >
                        < TaskTwoToneIcon />
                      </IconButton>
                    </Tooltip>
                  </>

                ) : (convocatoria.estado.id > 1 && convocatoria.categoria_id == 1) ? (
                  <>
                    <Tooltip title="Evaluar Entrevista" placement="right-start">
                      <IconButton sx={{ color: '#f3f3f3' }} aria-label="evaluar" onClick={() => { handleOpen(params.row.id) }}    >
                        < FactCheckIcon sx={{ color: cyan[600] }} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Evaluar Desempeño" placement="right-start">
                      <IconButton sx={{ color: '#f3f3f3' }} aria-label="evaluar" onClick={() => {
                        handleOpenAptitud(params.row.id)
                      }}   >
                        <TaskTwoToneIcon sx={{ color: cyan[600] }} />
                      </IconButton>
                    </Tooltip>
                  </>

                ) :
                  (
                    <Chip label="No disponible" color="warning" variant='outlined' />

                  )
            }



          </>
        )
      }
    }



  ];
  const devolverPuntajeEntrevista = (puntajes: evaluacion_x_postulante[]) => {
    let formato = '';

    puntajes.forEach(p => {
      formato += p.puntaje + ','

    });


    return formato.split(',')[0]
  }
  const devolverPuntajeJurado = (puntajes: evaluacion_x_postulante[]) => {
    let formato = '';
    puntajes.forEach(p => {
      formato += p.puntaje + ','

    });


    return formato.split(',')[1]
  }

  const tot = (puntajes: evaluacion_x_postulante[]) => {
    let suma = 0;
    puntajes.forEach(p => {
      suma += p.puntaje
    });

    return suma;

  }


  const rows = postulantes.map((p) => ({
    id: p.postulante.id,
    postulante: p.postulante.persona.nombres + ' ' + p.postulante.persona.apellido_pat + ' ' + p.postulante.persona.apellido_mat,
    estado: parseInt(p.estado_postulante_id),
    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    especialidad: p.postulante.especialidad,
    experiencia: p.postulante.experiencia + ' años',
    sueldo: 'S/ ' + p.postulante.sueldo,
    puntajeEntr: devolverPuntajeEntrevista(p.postulante.evaluacion_x_postulante),
    puntajeJur: devolverPuntajeJurado(p.postulante.evaluacion_x_postulante),
    total: tot(p.postulante.evaluacion_x_postulante),
    idCp: p.id

  }))



  const [idEv, setIdEv] = useState<string | number>('');
  const [idPos, setIdPos] = useState<string | number>('');
  const [open, setOpen] = useState(false)
  const handleOpen = (id: number) => {
    setOpen(true);
    setIdPos(id)
    setIdEv(1)
  };

  const handleClose = () => {
    setOpen(false);
  };



  const handleConfirm = async () => {



    const puntaje = calcularTotal();
    setIdEv(1)

    try {

      const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 50 });
      console.log(resp)
      toast.success('🦄 Puntaje asignado correctamente!'),
        limpiarCriterios()
      handleClose()
    } catch (error) {

      console.log(error);
      alert('El postulante ya tiene puntaje');
    }





  };

  const handleChange = (event: SelectChangeEvent<typeof idEv>) => {

    setIdEv(event.target.value);

  };
  const puntajeEntrevistaValido = (id: number) => {

    const result = postulantes.filter(p => id === p.postulante.id);
    // console.log(result[0].postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje).length)
    if (result[0].postulante.evaluacion_x_postulante.map((ps: any) => ps.puntaje).length <= 0 && result[0].postulante.estado_postulante.id > 1) {
      return true;
    }
    return false;

  }

  const onStatusUpdated = async (id: number, newStatus: string) => {
    //TODO validar puntaje en entrevista */

    // if (!puntajeEntrevistaValido(id)) {
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
      alert('No se pudo actualizar el estado del postulante');
    }


    // } else {
    //   alert('no se puede promover al postulante, no tiene puntaje en la fase anterior')
    // }

  }
  const onStatusJobUpdated = async (id: number, newStatus: string) => {
    try {

      await reclutApi.put('/admin/job', { id, status: newStatus });
      refreshData()
    } catch (error) {

      console.log(error);
      alert('No se pudo actualizar el role del usuario');
    }

  }
  const refreshData = () => {
    router.replace(router.asPath)
  }
  //-----------------------------------------------------------------------------------------
  const [openClase, setOpenClase] = useState(false)
  const handleOpenClase = (id: number) => {
    setOpenClase(true);
    setIdPos(id)
    setIdEv(2)
  };

  const handleCloseClase = () => {
    setOpenClase(false);
  };



  const handleConfirmClase = async () => {
    //TODO validar actualizacion o creacion  */


    const puntaje = calcularTotal();


    try {

      const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100 });
      console.log(resp)
      toast.success('🦄 Puntaje asignado correctamente!'),
        handleCloseClase()
      limpiarCriterios()

    } catch (error) {

      console.log(error);
      alert('El postulante ya tiene puntaje');
    }





  };

  //-------------------------------------------------------------------
  const [openAptitud, setOpenAptitud] = useState(false)
  const handleOpenAptitud = (id: number) => {
    setOpenAptitud(true);
    setIdPos(id)
    setIdEv(2)
  };

  const handleCloseAptitud = () => {
    setOpenAptitud(false);
  };
  const handleConfirmAptitud = async () => {
    //TODO validar actualizacion o creacion  */


    const puntaje = calcularTotal();


    try {

      const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100 });
      console.log(resp)
      toast.success('🦄 Puntaje asignado correctamente!'),
        handleCloseAptitud()
      limpiarCriterios()

    } catch (error) {

      console.log(error);
      alert('El postulante ya tiene puntaje');
    }





  };


  return (
    <AdminLayout title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>

      <Box>

        <Typography variant="subtitle1">Vacantes: {convocatoria.vacantes}</Typography>
        <Typography variant="subtitle1">Postulantes: {postulantes.length}</Typography>
        <Typography variant="subtitle1">Estado: {convocatoria.estado.nombre}</Typography>
        <Typography variant="subtitle1">Estado: {convocatoria.estado.id}</Typography>
        <Typography variant="subtitle1">categoria: {convocatoria.categoria_id}</Typography>
        <Typography variant="subtitle1">Postulantes: {postulantes.length}</Typography>

        <Select
          value={convocatoria.estado.id}
          label="Rol"
          onChange={(e: SelectChangeEvent<number>) => onStatusJobUpdated(convocatoria.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
          sx={{ width: '200px' }}
        >
          <MenuItem value={1}> Abierta </MenuItem>
          <MenuItem value={2}>En evaluación</MenuItem>
          <MenuItem value={3}> Cerrada</MenuItem>

        </Select>
      </Box>
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .mal': {
            backgroundColor: '#ff5722',
            color: '#FFF',
          },
          '& .medio': {
            backgroundColor: '#ff943975',
            color: '#FFF',
          },
          '& .bien': {
            backgroundColor: '#4caf50',
            color: '#FFF',
          },
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getCellClassName={(params: GridCellParams<any, any, number>) => {
            if (params.field !== 'total' || params.value == null) {
              return '';
            }
            return params.value >= 75 ? 'bien' : 'mal';
          }}
        />
      </Box>

      <ModalEntrevista title={'Calificar Entrevista'} open={open} handleClose={handleClose} >
        <form onSubmit={handleConfirm}>
          <DialogContent>
            <RatingFrom />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='error' sx={{ textTransform: 'uppercase', mt: 1, mr: 1 }} variant="outlined">
              Cancelar
            </Button>

            <Button onClick={handleConfirm} sx={{ mt: 1, mr: 1, textTransform: 'uppercase' }} variant="outlined">
              Finalizar
            </Button>
          </DialogActions>
        </form>
      </ModalEntrevista>
      <ModalClase title={'Evaluar Clase Modelo'} open={openClase} handleClose={handleCloseClase} handleConfirm={handleConfirmClase} />
      <ModalAptitud title={'Evaluar aptitudes'} open={openAptitud} handleClose={handleCloseAptitud} handleConfirm={handleConfirmAptitud} />
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


  const evaluaciones = JSON.parse(JSON.stringify(await prisma.evaluacion.findMany()))
  await prisma.$disconnect()

  return {
    props: { convocatoria, evaluaciones }
  }
}


export default AnnouncementPage;
