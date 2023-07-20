import NextLink from 'next/link';
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridCellParams, GridCloseIcon, GridColDef, esES } from "@mui/x-data-grid";
import { Link, Box, Typography, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent, Button, DialogActions, DialogContent, Chip, Grid, Paper, styled, Breadcrumbs, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, List, ListItem, ListItemText, Divider, useMediaQuery, Backdrop, CircularProgress } from '@mui/material';
import { evaluacion_x_postulante, postulante, categoria } from '@prisma/client';
import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { cyan, yellow } from '@mui/material/colors';
import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import { IJob, IUser } from '@/interfaces';
import { reclutApi } from '@/apies';
import { ModalAptitud, ModalEntrevista } from '@/components/modal';
import RatingFrom from '@/components/modal/RatingForm';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import NumbersIcon from '@mui/icons-material/Numbers';
import PeopleIcon from '@mui/icons-material/People';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { Paperbase } from '@/components/dash';
import { useSession } from 'next-auth/react';
import Modal from '../../../../components/modal/Modal';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { usePostulantes } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';
import { Send } from '@mui/icons-material';

interface Props {
  postulantes: postulante[]
  convocatoria: IJob
  items: any[]
  jurados: IUser[];

}

const AnnouncementPage: NextPage<Props> = ({ convocatoria, jurados, items }) => {

  const router = useRouter();
  const { id } = router.query
  const { pos, isLoading } = usePostulantes(`/admin/postulantes/${convocatoria.id}`);

  const [postulantes, setPostulantes] = useState<any[]>([]);

  const { calcularTotal, limpiarCriterios, juradosAsignados, addNewJurado, deleteJurado, refreshJurados } = useContext(PostContext);

  const [seleccionados, setSeleccionados] = useState<any[]>([])
  const [contratados, setContratados] = useState<any[]>([])
  const [descartados, setDescartados] = useState<any[]>([])

  const [calificacion, setCalificacion] = useState<any[]>([])
  const [modalCalificacion, setModalCalificacion] = useState(false)

  const [filtrando, setFiltrando] = useState(true)
  const hadleOpenCalificacion = (puntajes: any[]) => {
    setCalificacion(puntajes);
    setModalCalificacion(true);


  }


  const [idEv, setIdEv] = useState<string | number>('');
  const [idPos, setIdPos] = useState<string | number>('');

  const [messageModal, setMessageModal] = useState(false)
  const [message, setMessage] = useState('')
  const [lastMessage, setLastMessage] = useState('')
  const [fechaComennt, setFechaComennt] = useState('')
  const sendMessage = async () => {

    try {
      const { data } = await reclutApi.post(`/admin/postulantes/1`, { idPos, message });
      setLastMessage(data.p.comentario)
      setFechaComennt(data.p.fecha_comentario)
      setMessage('');
      toast.success('🦄 Mensage enviado correctamente!')

    } catch (error) {
      console.log(error)
    }

    // setMessageModal(false)


  }


  useEffect(() => {


    if (pos) {

      refreshJurados()

      const seleccionados = pos.filter(d => d.estado_postulante_id === 6)
      const contratados = pos.filter(d => d.estado_postulante_id === 7)
      const descartados = pos.filter(d => d.estado_postulante_id === 4)
      const aptos = pos.filter(d => d.estado_postulante_id !== 4)
      if (filtrando) {


        setPostulantes(aptos);
      } else {

        setPostulantes(descartados)
      }
      console.log(postulantes)

      setSeleccionados(seleccionados);
      setDescartados(descartados);
      setContratados(contratados);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, filtrando])


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'N°', width: 50 },
    {
      field: 'postulante',
      headerName: 'Postulante',
      width: 250,
      renderCell: ({ row }) => {
        return (
          <NextLink href={`/admin/convocatorias/convocatoria/p/${row.idPos}?conv=${id}`} passHref legacyBehavior>
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
      field: 'puntajeEntr',
      headerName: 'Puntaje Entrevista',
      width: 150,

    },
    {
      field: 'puntajeJur',
      headerName: ' Puntaje Jurados',
      width: 150,

    },
    {
      field: 'total',
      headerName: 'Total',
      width: 50,

    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {

        return (
          <Chip label={`${params.row.estado}`} color="info" variant='outlined' />

          //     <Select
          //       value={parseInt(params.row.estado)}
          //       label="Estado"
          //       onChange={(e: SelectChangeEvent<number>) => onStatusUpdated(params.row.idCp, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )
          //       sx={{ width: '200px' }}
          //       disabled={convocatoria.estadoId === 3}
          //     >

          //       <MenuItem value='1'> Inscrito </MenuItem>
          //       <MenuItem value='2'> Pasa a Entrevista</MenuItem>
          //       <MenuItem value='3'> Pasa a Evaluación</MenuItem>
          //       <MenuItem value='4'> No Interesa </MenuItem>
          //       <MenuItem value='5'> Interesante </MenuItem>
          //       <MenuItem value='6'> Seleccionado</MenuItem>
          //       <MenuItem value='7'> Contratado</MenuItem>


          //     </Select>
        )
      }
    },
    {
      field: 'actions', headerName: 'Evaluar Entrevista', width: 200,
      sortable: false,
      renderCell: (params) => {


        function handleOpenMessage(id: any, comentario: string, fecha: string) {
          setMessageModal(true)
          setIdPos(id)
          setLastMessage(comentario)
          setFechaComennt(fecha)
        }

        return (
          <>

            {

              (convocatoria.estado.id !== 3) ?
                (


                  <>

                    <IconButton
                      sx={{ color: cyan[600] }}
                      aria-label="evaluar"
                      onClick={() => { handleOpen(params.row.id,) }}
                      disabled={params.row.estado !== 2 || params.row.puntajeEntr > 0}
                    >
                      < FactCheckIcon />
                    </IconButton>
                    <Tooltip title="Ver puntos"  >
                      <IconButton
                        sx={{ color: yellow[800] }}
                        aria-label="evaluar"
                        onClick={() => { hadleOpenCalificacion(params.row.calificaciones) }}

                      >
                        < StarsIcon />
                      </IconButton>
                    </Tooltip>

                  </>

                ) : (convocatoria.estado.id !== 3 && convocatoria.categoria_id == 1) ? (
                  <>

                    <IconButton
                      sx={{ color: cyan[600] }}
                      aria-label="evaluar"
                      onClick={() => { handleOpen(params.row.id) }}
                      disabled={params.row.estado !== 2 || params.row.puntajeEntr > 0} >
                      < FactCheckIcon />
                    </IconButton>




                  </>

                ) :
                  (
                    <Chip label="No disponible" color="warning" variant='outlined' />

                  )
            }

            <IconButton
              sx={{ color: cyan[600] }}
              aria-label="evaluar"
              onClick={() => { handleOpenMessage(params.row.idCp, params.row.comentario, params.row.fechaComentario) }}

            >
              < SpeakerNotesIcon />
            </IconButton>

          </>
        )
      }
    }



  ];
  const devolverPuntajeEntrevista = (puntajes: evaluacion_x_postulante[]) => {
    let puntaje = 0;
    const resultado = puntajes.forEach(x => {
      if (x.evaluacion_id === 1) {
        puntaje += x.puntaje
      } else {
        return '';
      }
    });
    return puntaje;
  }
  const devolverPuntajeJurado = (puntajes: evaluacion_x_postulante[]) => {

    let puntaje = 0;
    const resultado = puntajes.forEach(x => {
      if (x.evaluacion_id === 2) {
        puntaje += x.puntaje
      } else {
        return '';
      }
    });
    return puntaje;
  }

  const tot = (puntajes: evaluacion_x_postulante[]) => {
    let suma = 0;
    puntajes.forEach(p => {
      suma += p.puntaje
    });

    return suma;

  }
  const formatoNombre = (nombres: string, apellidoPat: string, apellidoMat: string) => {
    const str = apellidoPat + ' ' + apellidoMat + ' ' + nombres;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

  }


  const rows = postulantes.map((p, index) => ({
    id: index + 1,
    postulante: formatoNombre(p.postulante.persona.nombres, p.postulante.persona.apellido_pat, p.postulante.persona.apellido_mat),
    estado: p.estado_postulante.nombre,
    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    idPos: p.postulante.id,
    sueldo: 'S/ ' + p.postulante.sueldo,
    puntajeEntr: devolverPuntajeEntrevista(p.postulante.evaluacion_x_postulante),
    puntajeJur: devolverPuntajeJurado(p.postulante.evaluacion_x_postulante),
    total: tot(p.postulante.evaluacion_x_postulante),
    calificaciones: p.postulante.evaluacion_x_postulante,
    idCp: p.id,
    comentario: p.comentario,
    fechaComentario: p.fecha_comentario
  }))



  const [open, setOpen] = useState(false)
  const handleOpen = (id: number) => {
    setOpen(true);
    setIdPos(id)
    setIdEv(1)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const ses: any = useSession();
  const handleConfirm = async () => {
    const idUser = ses.data.user.id;
    const puntaje = calcularTotal();
    setIdEv(1)

    try {

      const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 50, idUser });

      toast.success('🦄 Puntaje asignado correctamente!'),
        limpiarCriterios()
      handleClose()
    } catch (error) {

      console.log(error);

    }





  };


  const [backd, setBackd] = useState(false)
  const onStatusUpdated = async (id: number, newStatus: string) => {


    // if (!puntajeEntrevistaValido(id)) {
    const previosPostulantes = postulantes.map(p => ({ ...p }));
    const updatedPostulantes = postulantes.map(p => ({
      ...p,
      estado_postulante_id: id === p.id ? parseInt(newStatus) : p.id
    }));
    setPostulantes(updatedPostulantes);


    try {

      const res = await reclutApi.put('/admin/postulantes/1', { id, status: newStatus });

    } catch (error) {
      setPostulantes(previosPostulantes);
      console.log(error);
      alert('No se pudo actualizar el estado del postulante');
    }



  }

  const onStatusJobUpdated = async (id: number, newStatus: string) => {

    // verificar cantidad de seleccionados antes de cambiar de estado
    if (convocatoria.vacantes !== contratados.length && parseInt(newStatus) === 3) {
      toast.error('No se puede cerrar la convocatoria aún hay vacantes disponibles')
      return;
    }


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


  //-------------------------------------------------------------------


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10

  }));
  const [juradoModal, setJuradoModal] = useState(false)
  const [jurado, setJurado] = useState('')
  const onJuradoChange = (event: SelectChangeEvent<string>) => {
    setJurado(event.target.value);

  }

  const asignarJurado = async () => {

    if (jurado) {

      const mensaje = await addNewJurado(jurado)

    } else {
      toast.error('Seleccione una opción')
      return
    }

    setJuradoModal(false)
    // refreshJurados()

  }




  const matches = useMediaQuery('(min-width:600px)');
  return (
    <Paperbase title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
      <ToastContainer />

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backd}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading
        ? <FullScreenLoading />
        :
        <Box sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible', position: 'relative', } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }} className="fadeIn"  >
          <Box mb={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}>
                Convocatorias
              </Link>

              <Typography fontWeight={'bold'} color="text.primary">{convocatoria.titulo}</Typography>
            </Breadcrumbs>
          </Box>

          <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} >
                <Item elevation={4}>

                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <NumbersIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>
                      <Typography color={'#454555'} variant="body1" > Vacantes</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{convocatoria.vacantes - contratados.length} </Typography>

                    </Box>
                  </Box>

                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <PeopleIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>  <Typography color={'#454555'} variant="body1" > Postulantes</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{postulantes.length} </Typography>

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} >
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <SpellcheckIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>

                      <Typography color={'#454555'} variant="body1" > Estado </Typography>
                      <Select
                        value={convocatoria.estado.id}
                        label="Estado"
                        onChange={(e: SelectChangeEvent<number>) => onStatusJobUpdated(convocatoria.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )

                      >
                        <MenuItem value={1}> Abierta </MenuItem>
                        <MenuItem value={2}>En evaluación</MenuItem>
                        <MenuItem value={3}> Cerrada</MenuItem>

                      </Select>

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <CategoryIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box><Typography color={'#454555'} variant="body1" > Categoria</Typography>
                      <Typography color={'#454555'} fontWeight={'bold'} fontSize={37} textTransform={'capitalize'}>{convocatoria.categoria.nombre} </Typography>

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <HowToRegIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>
                      <Typography color={'#454555'} variant="body1" > Seleccionados</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h3" textTransform={'uppercase'}>{seleccionados.length} </Typography>

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <PersonRemoveAlt1Icon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>
                      <Typography color={'#454555'} variant="body1" > Descartados</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h3" >{descartados.length} </Typography>

                    </Box>
                  </Box>
                </Item>
              </Grid>

            </Grid>
            <Box >
              <Item elevation={4}>
                <Button onClick={() => setJuradoModal(true)}>Asignar jurados</Button>
                <List dense>
                  <Typography fontWeight={'bold'}>Jurados</Typography>
                  {
                    juradosAsignados.map((j) =>
                    (

                      <ListItem key={j.id}>
                        <ListItemText
                          primary={`${j.user.persona.nombres + ' ' + j.user.persona.apellido_pat + ' ' + j.user.persona.apellido_mat}`}

                        />

                        <IconButton size="small" aria-label="delete" onClick={() => deleteJurado(j.id)}>
                          <GridCloseIcon fontSize="inherit" />
                        </IconButton>

                      </ListItem>

                    )
                    )
                  }
                </List>
              </Item>

            </Box>
          </Box>
          <Box mt={4}
          >
            <Item elevation={4} sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography>Listado de Postulantes</Typography>

                {filtrando ? (
                  <Tooltip title={'Mostrar descartados'} >
                    <IconButton onClick={() => setFiltrando(false)}>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>

                ) : (
                  <Tooltip title={'Ocultar descartados'} >
                    <IconButton onClick={() => setFiltrando(true)}>
                      <VisibilityOffIcon />
                    </IconButton>
                  </Tooltip>
                )}




              </Box>
              <Box
                sx={{
                  height: 400,
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
                }} >

                <DataGrid
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
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
            </Item>

          </Box>
        </Box>
      }
      <Modal title={'Calificación'} open={modalCalificacion} handleClose={() => setModalCalificacion(false)}
        handleConfirm={() => setModalCalificacion(false)}>

        <Box width={500} display={'flex'} gap={5} justifyContent={'start'}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Jurado</TableCell>
                  <TableCell align="right">Puntaje</TableCell>
                  <TableCell align="right">Tipo</TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {calificacion.map((e: any) => (
                  <TableRow
                    key={e.user.email}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{e.user.email}</TableCell>
                    <TableCell align="right">{e.puntaje}</TableCell>

                    <TableCell align="right" component="th" scope="row">
                      {e.evaluacion_id === 1 ? 'Entrevista ' : 'Jurado'}
                    </TableCell>


                  </TableRow>
                ))}

              </TableBody>
            </Table>
            {
              calificacion.length === 0 && (
                <Box padding={4}>
                  <Typography align="center">El postulante aún no tiene calificación</Typography>
                </Box>


              )
            }
          </TableContainer>


        </Box>


      </Modal>
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


      <Modal title={'Agregar comentario'} open={messageModal} handleClose={() => setMessageModal(false)} handleConfirm={() => setMessageModal(false)}>
        <Box mt={1} >

          <TextField onChange={(e) => setMessage(e.target.value)} value={message} multiline rows={3} fullWidth id="outlined-basic" label="Agregar Mensaje" variant="outlined" sx={{ mb: 2 }} />
          <Box display={'flex'} justifyContent={'end'}>
            <Button sx={{ mb: 1 }} variant='contained' endIcon={<Send />} onClick={sendMessage} >Enviar</Button>
          </Box>
          <Divider />
          <Box mt={2}>
            <Typography variant='body1' fontWeight={'bold'}>Último mensaje</Typography>
            <Paper>
              <Box padding={1} mt={1}>
                <Typography >{lastMessage}</Typography>
                <Typography variant='body2' color={'gray'}>{fechaComennt ? (moment(fechaComennt).fromNow()) : 'No hay mensajes'}</Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Modal>
      <Modal title={'Asignar jurados'} open={juradoModal} handleClose={() => setJuradoModal(false)} handleConfirm={() => asignarJurado()}>
        <Box width={400}>
          <FormControl fullWidth >
            <InputLabel id="gradoId">Seleccione</InputLabel>
            <Select
              labelId="gradoId"
              id="gradoId"
              label="Requisito"
              onChange={onJuradoChange}
              value={jurado}

            >

              <MenuItem value={0} disabled></MenuItem>
              {
                jurados.map(jurado => (
                  <MenuItem key={jurado.id} value={jurado.id}>{jurado.persona.nombres.toLocaleUpperCase() + ' ' + jurado.persona.apellido_pat.toLocaleUpperCase() + ' ' + jurado.persona.apellido_mat.toLocaleUpperCase()}</MenuItem>
                ))
              }


            </Select>

          </FormControl>
        </Box>

      </Modal>
      {/* 
      <ModalEval title={'Evaluacion'} open={false} handleClose={function (): void {
        throw new Error('Function not implemented.');
      }} handleConfirm={function (): void {
        throw new Error('Function not implemented.');
      }} items={items} idPostulante={0}>

      </ModalEval> */}
    </Paperbase>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id = '' } = query;
  if (isNaN(parseInt(id.toString()))) {
    return {
      redirect: {
        destination: '/admin/convocatorias',
        permanent: false
      }
    }
  }
  const resConvocatoria = await prisma.convocatoria.findUnique({
    where: {
      id: parseInt(id.toString())
    },
    select: {
      id: true,
      titulo: true,
      vacantes: true,
      estado: {
        select: { id: true, nombre: true },
      },
      grado: {
        select: { nombre: true },
      },
      categoria: {
        select: { nombre: true }
      },
      _count: {
        select: { postulante_x_convocatoria: true }
      }
    },
  })
  if (!resConvocatoria) {
    return {
      redirect: {
        destination: '/admin/convocatorias',
        permanent: false
      }
    }
  }
  const juradosSer = await prisma.user.findMany({
    where: {
      OR: [
        {
          rol_id: 3
        },
        {
          rol_id: 4
        }
      ],
    },
    select: {
      id: true,
      persona: true
    }
  })

  const items = await prisma.item.findMany({
    where: {
      test_id: 1
    }
  })


  await prisma.$disconnect()

  const convocatoria = JSON.parse(JSON.stringify(resConvocatoria))
  const jurados = JSON.parse(JSON.stringify(juradosSer))
  // const juradosAsignados = JSON.parse(JSON.stringify(juradosAser))


  return {
    props: { convocatoria, jurados, items },

  }
}


export default AnnouncementPage;
