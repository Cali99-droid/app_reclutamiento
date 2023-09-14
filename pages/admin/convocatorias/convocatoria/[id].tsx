import NextLink from 'next/link';
import { prisma } from '@/server/db/client';
import { PostContext } from '@/context';


import { GetServerSideProps, NextPage } from "next";
import { DataGrid, GridActionsCellItem, GridCellParams, GridCloseIcon, GridColDef, GridColumnVisibilityModel, GridToolbar, esES } from "@mui/x-data-grid";
import { Link, Box, Typography, IconButton, Tooltip, Select, MenuItem, SelectChangeEvent, Button, DialogActions, DialogContent, Chip, Grid, Paper, styled, Breadcrumbs, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, List, ListItem, ListItemText, Divider, useMediaQuery, Backdrop, CircularProgress, Alert, InputAdornment, FormHelperText } from '@mui/material';

import { calcularEdad } from "@/helpers/functions";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { cyan, green, yellow } from '@mui/material/colors';
import { useState, useEffect, useContext, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/router';

import { IJob, IUser } from '@/interfaces';
import { reclutApi } from '@/apies';
import { ModalAptitud, ModalEntrevista } from '@/components/modal';
import RatingFrom from '@/components/modal/RatingForm';

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import AddTaskIcon from '@mui/icons-material/AddTask';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SecurityIcon from '@mui/icons-material/Security';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import GavelIcon from '@mui/icons-material/Gavel';
import NumbersIcon from '@mui/icons-material/Numbers';
import PeopleIcon from '@mui/icons-material/People';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StarsIcon from '@mui/icons-material/Stars';
import CategoryIcon from '@mui/icons-material/Category';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { Paperbase } from '@/components/dash';
import { getSession, useSession } from 'next-auth/react';
import Modal from '../../../../components/modal/Modal';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { usePostulantes } from '@/hooks';
import { CustomChip, FullScreenLoading } from '@/components/ui';
import { InfoOutlined, Send } from '@mui/icons-material';
import ModalEval from '@/components/eval/test';
import confetti from 'canvas-confetti';
import { postulante } from '@prisma/client';
import axios from 'axios';
import Swal from 'sweetalert2';


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
  const seleccionados = pos.filter(d => d.estado_postulante_id === 7)
  const contratados = pos.filter(d => d.estado_postulante_id === 7)
  const descartados = pos.filter(d => d.estado_postulante_id === 4)


  const [postulantes, setPostulantes] = useState<any[]>([]);

  const { calcularTotal, limpiarCriterios, juradosAsignados, addNewJurado, deleteJurado, refreshJurados } = useContext(PostContext);

  // const [seleccionados, setSeleccionados] = useState<any[]>([])
  // const [contratados, setContratados] = useState<any[]>([])
  // const [descartados, setDescartados] = useState<any[]>([])

  const [calificacion, setCalificacion] = useState<any[]>([])
  const [modalCalificacion, setModalCalificacion] = useState(false)

  const [filtrando, setFiltrando] = useState(true)
  const hadleOpenCalificacion = (puntajes: any[]) => {
    setCalificacion(puntajes);
    setModalCalificacion(true);
  }

  const [idEv, setIdEv] = useState<string | number>('');
  const [idPosConv, setIdPosConv] = useState<string | number>('');
  const [idPos, setIdPos] = useState<string | number>('');

  const [messageModal, setMessageModal] = useState(false)
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState<number>();
  const [lastMessage, setLastMessage] = useState('')
  const [fechaComennt, setFechaComennt] = useState('')
  // const sendMessage = async () => {

  //   try {
  //     const { data } = await reclutApi.post(`/admin/postulantes/1`, { idPosConv, message });
  //     setLastMessage(data.p.comentario)
  //     setFechaComennt(data.p.fecha_comentario)
  //     setMessage('');
  //     toast.success('🦄 Mensage enviado correctamente!')

  //   } catch (error) {
  //     console.log(error)
  //   }

  //   // setMessageModal(false)


  // }


  useEffect(() => {
    console.log('uf')
    // if (pos) {
    //   setPostulantes(pos.filter(d => d.estado_postulante_id !== 4))
    refreshJurados()

    // const seleccionados = pos.filter(d => d.estado_postulante_id === 7)
    // const contratados = pos.filter(d => d.estado_postulante_id === 7)
    // const descartados = pos.filter(d => d.estado_postulante_id === 4)
    //const aptos = pos.filter(d => d.estado_postulante_id !== 4)

    if ((convocatoria.vacantes - contratados.length) === 0) {

      cerrarConcocatoria()
    }


    // if (!filtrando) {
    //   setPostulantes(descartados)
    // } else {

    // }

    // setSeleccionados(seleccionados);
    // setDescartados(descartados);
    // setContratados(contratados);


    // }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrando])

  const { openClase, handleOpenClase, handleCloseClase } = useContext(PostContext);

  const getEstado = (estado: string, puntajeEntr: any, puntajeJur: any) => {

    switch (estado) {
      case 'Inscrito':
        return 'Inscrito'

      case 'Apto entrevista':
        if (puntajeEntr.porcentaje < 30 && !puntajeEntr.noEval) {
          return '% Insuficiente'
        }
        return 'Apto entrevista'
      case 'Apto evaluación':

        if (puntajeJur.porcentaje < 30 && !puntajeJur.noEval) {
          return '% Insuficiente'
        } else {
          if (puntajeJur.porcentaje >= 30) {
            return 'Apto a Contrato'
          } else {
            return 'Apto evaluación'
          }

        }

      default:
        return estado
        break;
    }
  }
  const cerrarConcocatoria = async () => {
    try {

      await reclutApi.put('/admin/job', { id, status: 3 });
      refreshData()

    } catch (error) {

      console.log(error);
      alert('No se pudo cerrar la convocatoria');
    }
  }
  const devolverResultado = (puntajes: any[], evaluacion: boolean) => {
    let puntaje = 0;
    let puntos = 0;
    let jurados = 0;

    const resultado = puntajes.forEach(x => {
      //rol de admin
      if (evaluacion) {
        if (x.test.categoria_id === 3) {
          puntaje += (x.total / (x._count.puntaje_items));
          puntos += x.total
          jurados += 1
        }
        if (((puntaje / jurados) * 10) >= 30) {
          return {
            puntos,
            porcentaje: (puntaje / jurados) * 10 + '%',
            pasa: true
          }
        } else {
          return {
            puntos,
            porcentaje: (puntaje / jurados) * 10 + '%',
            pasa: false
          }
        }


      } else {
        if (x.user.rol.id === 5) {
          puntaje += (x.total / x._count.puntaje_items)
          puntos += x.total
        }
        if (Math.round(puntaje * 10) >= 30) {
          return {
            puntos,
            porcentaje: Math.round(puntaje * 10) + '%',
            pasa: true
          }
        } else {
          return {
            puntos,
            porcentaje: Math.round(puntaje * 10) + '%',
            pasa: false
          }
        }
      }

    });

    // return (puntos + '(' + Math.round(puntaje * 10) + '%)').toString();
  }
  const CountButton = () => {
    const [count, setCount] = useState(0);

    return (
      <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>
    );
  };

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
      field: 'telefono',
      headerName: 'Telefono',
      width: 100,

    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,

    },


    {
      field: 'puntajeEntr',
      headerName: ' Entrevista (%)',
      width: 150,
      type: 'number',
      valueFormatter: ({ value }) => value + ' %',
      cellClassName: (params: GridCellParams<any, number>) => {
        if (params.value == null) {
          return '';
        }
        if (params.value == 0) {
          return 'sindatos';
        }
        if (params.value < 30) {
          return 'medio'
        } else {
          return 'bien'
        }

      }
    },
    {
      field: 'puntajeJur',
      headerName: ' Jurados(%)',
      width: 150,
      type: 'number',
      valueFormatter: ({ value }) => value + ' %',
      cellClassName: (params: GridCellParams<any, number>) => {
        if (params.value == null) {
          return '';
        }
        if (params.value == 0) {
          return 'sindatos';
        }
        if (params.value < 30) {
          return 'medio'
        } else {
          return 'bien'
        }

      }
    },
    // {
    //   field: 'total',
    //   headerName: 'Total',
    //   width: 50,

    // },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      renderCell: (params) => {
        return (
          //icon={<InfoOutlined />}
          <CustomChip value={params.row.est} />
        )
      }
    },

    {
      field: 'actions', headerName: 'Acciones', width: 120,
      sortable: false,
      type: 'actions',
      getActions: (params) => [
        <GridActionsCellItem
          sx={{ color: yellow[800] }}
          key={params.row.id}
          icon={<StarsIcon />}
          label="Puntos"
          onClick={() => { hadleOpenCalificacion(params.row.calificaciones) }}
        />,
        <GridActionsCellItem
          sx={{ color: green[800] }}
          key={params.row.id}
          icon={<WhatsAppIcon />}
          label="Mensaje"
          onClick={() => { handleOpenMessage(params.row.idCp, params.row.comentario, params.row.fechaComentario, params.row.telefono, params.row.messages) }}
        />,
        <GridActionsCellItem
          disabled={params.row.estadoId !== 2 || params.row.puntajeEntr > 0}
          key={params.row.id}
          icon={<AddTaskIcon />}
          label="Entrevistar"
          onClick={() => { handleOpenClase(params.row.idPos) }}

          showInMenu
        />,
        <GridActionsCellItem
          key={params.row.id}
          icon={<GavelIcon />}
          label="Contratar"
          onClick={() => { handleOpenContrato(params.row.idCp, params.row.idPos) }}
          showInMenu
          disabled={params.row.puntajeJur < 30 || (convocatoria.vacantes - contratados.length) === 0 || params.row.estado === 'Contratado'}
        />,
      ]

    }



  ];
  const [mgs, setMgs] = useState<any[]>([])
  const contentRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  };
  function handleOpenMessage(id: any, comentario: string, fecha: string, phone: number, mesagges: string[]) {
    setMessageModal(true)
    setIdPosConv(id)
    setLastMessage(comentario)
    setFechaComennt(fecha)
    setPhone(phone);
    setMgs(mesagges);

  }
  const devolverPuntajeEntrevista = (puntajes: any[]) => {

    let puntaje = 0;
    let puntos = 0;
    const resultado = puntajes.forEach(x => {
      //rol de admin
      if (x.test.categoria_id === 3) {
        puntaje += (x.total / x.maximo)
        puntos += x.total
      }
    });
    if (Math.round(puntaje * 100) === 0) {
      return {
        puntos,
        porcentaje: Math.round(puntaje * 100),
        pasa: true,
        noEval: true,
        mensaje: 'Sin datos'
      }
    }
    if (Math.round(puntaje * 100) >= 30) {


      return {
        puntos,
        porcentaje: Math.round(puntaje * 100),
        pasa: true,
        mensaje: Math.round(puntaje * 100) + '% ' + 'Puntaje entrevista'
      }
    } else {
      return {
        puntos,
        porcentaje: Math.round(puntaje * 100),
        pasa: false,
        mensaje: Math.round(puntaje * 100) + '%' + 'Puntaje entrevista'
      }
    }
    // return (puntos + '(' + Math.round(puntaje * 10) + '%)').toString();
  }
  const getPuntajeEntrevista = (puntajes: any[]) => {
    let puntaje = 0;

    const resultado = puntajes.forEach(x => {
      //rol de admin
      if (x.test.categoria_id === 3) {
        puntaje += (x.total / x.maximo)

      } else {
        return '';
      }
    });
    return (Math.round(puntaje * 100));
  }
  const devolverPuntajeJurado = (puntajes: any[]) => {

    let puntaje = 0;
    let jurados = 0;
    let puntos = 0;
    let maximo = 0;
    // if(puntajes.length === 0){
    //   return {
    //     puntos,
    //     porcentaje: isNaN(Math.round(puntaje * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
    //     pasa: true,
    //     noEval: true,
    //     mensaje: 'Aún no evaluado'
    //   }
    // }
    const resultado = puntajes.forEach(x => {

      if (x.test.categoria_id === 1 || x.test.categoria_id === 2) {
        puntaje += (x.total);
        maximo += (x.maximo)

        jurados += 1
        puntos += x.total
      } else {
        return '';
      }
    });
    if (puntos === 0) {

      return {
        puntos,
        porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
        pasa: true,
        noEval: true,
        mensaje: 'Aún no evaluado'
      }
    }
    if (Math.round((puntaje / maximo) * 100) >= 30) {
      return {
        puntos,
        porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
        pasa: true,
        mensaje: Math.round((puntaje / jurados) * 10) + '% ' + 'Puntaje Evaluación'
      }
    } else {
      return {
        puntos,
        porcentaje: isNaN(Math.round((puntaje / jurados) * 10)) ? 0 : Math.round((puntaje / maximo) * 100),
        pasa: false,
        mensaje: Math.round((puntaje / jurados) * 10) + '% ' + 'Puntaje Evaluación'
      }
    }

  }
  const getPuntajeJurado = (puntajes: any[]) => {
    let puntaje = 0;

    const resultado = puntajes.forEach(x => {
      //rol de admin
      if (x.user.rol.id === 3 || x.user.rol.id === 4) {
        puntaje += (x.total)

      } else {
        return '';
      }
    });
    return (puntaje);
  }
  const tot = (puntajes: any[]) => {
    let suma = 0;
    puntajes.forEach(p => {
      suma += p.total
    });

    return suma;

  }
  const formatoNombre = (nombres: string, apellidoPat: string, apellidoMat: string) => {
    const str = apellidoPat + ' ' + apellidoMat + ' ' + nombres;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
    });

  }


  const rows = pos.map((p, index) => ({
    id: index + 1,
    postulante: formatoNombre(p.postulante.persona.nombres, p.postulante.persona.apellido_pat, p.postulante.persona.apellido_mat),
    estado: p.estado_postulante.nombre,
    estadoId: p.estado_postulante.id,
    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    idPos: p.postulante.id,
    sueldo: 'S/ ' + p.postulante.sueldo,
    puntajeEntr: devolverPuntajeEntrevista(p.postulante.puntajes).porcentaje,
    puntajeJur: devolverPuntajeJurado(p.postulante.puntajes).porcentaje,
    total: tot(p.postulante.puntajes),
    calificaciones: p.postulante.puntajes,
    idCp: p.id,
    comentario: p.comentario,
    fechaComentario: p.fecha_comentario,
    resultado: p.postulante.puntajes,
    est: getEstado(p.estado_postulante.nombre, devolverPuntajeEntrevista(p.postulante.puntajes), devolverPuntajeJurado(p.postulante.puntajes)),
    telefono: p.postulante.telefono,
    email: p.postulante.persona.user[0].email,
    messages: p.postulante.mensajes


  }))



  const [open, setOpen] = useState(false)
  const handleOpen = (id: number) => {

    setOpen(true);
    setIdPosConv(id)
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

      const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPosConv, idEv, max: 50, idUser });

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



  //Contratos
  const [openContrato, setOpenContrato] = useState(false)
  const [monto, setMonto] = useState('');
  const [error, setError] = useState(false)
  const contratar = async () => {
    if (monto.length <= 0) {
      setError(true)
      toast.error('Completa los campos')
      return;
    }

    try {
      const { data } = await reclutApi.post(`/admin/contratar`, { idPosConv, monto, idPos });
      setOpenContrato(false)
      confetti({
        particleCount: 300,
        spread: 70,
        origin: { y: 0.6 }
      });
      toast.success('🦄 Tenemos un nuevo contratado')

    } catch (error) {
      setOpenContrato(false);
      if (axios.isAxiosError(error)) {
        setOpenContrato(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response?.data.message,
          footer: `<a href='${process.env.NEXT_PUBLIC_URL_BASE}admin/convocatorias/convocatoria/p/${idPos}?conv=${id}'>Revisar ficha del postulante</a>`
        })

      }
      console.log(error)
    }
  }

  const handleOpenContrato = (idPosConv: number, idPos: number) => {
    setIdPosConv(idPosConv)
    setIdPos(idPos)
    setOpenContrato(true);
  }
  const onMontoChange = (event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.value.length <= 0 || event.target.value.length > 4) {
      setError(true)
    }


    setMonto(event.target.value);

  }

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>({
    telefono: false,
    email: false,
    edad: false,
  });

  const sendMessage = async () => {

    try {
      // const config = {
      //   headers: {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
      //   }
      // };
      const { data } = await reclutApi.post(`/admin/postulantes/1`, { idPosConv, message });
      // setLastMessage(data.msg.contenido)
      // setFechaComennt(data.msg.fecha)
      mgs.unshift(data.msg)
      // setMgs([...mgs, ])

      const url = `https://api.whatsapp.com/send?phone=+51${encodeURIComponent(phone!)}&text=${encodeURIComponent(message)}`;
      const newTab = window.open(url, '_blank');
      newTab!.focus();
      toast.success('🦄 Mensage enviado correctamente!')
      setMessage('');
      // const response = await axios.get(url, config);
      // console.log('Message sent:', response.data);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
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
        <Box sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible', position: 'relative', } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }} className="fadeIn"  >
          <Box mb={2}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}>
                Convocatorias
              </Link>

              <Typography fontWeight={'bold'} color="text.primary">{convocatoria.titulo}</Typography>
            </Breadcrumbs>
          </Box>

          <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'} >

            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} >
                <Item elevation={4}>

                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <NumbersIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>
                      <Typography color={'#454555'} variant="body1" > Vacantes</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{convocatoria.vacantes - contratados.length} </Typography>

                    </Box>
                  </Box>

                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <PeopleIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>  <Typography color={'#454555'} variant="body1" > Postulantes</Typography>
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{pos.length} </Typography>

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} >
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'} >
                    <SpellcheckIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box>
                      <Typography color={'#454555'} variant="body1" >Estado</Typography>
                      <Typography color={convocatoria.estado.id === 3 ? '#ED1C24' : '#454555'} fontWeight={'bold'} fontSize={28} textTransform={'capitalize'} >{convocatoria.estado.nombre} </Typography>
                      {/* <Select
                        value={convocatoria.estado.id}
                        label="Estado"
                        onChange={(e: SelectChangeEvent<number>) => onStatusJobUpdated(convocatoria.id, (e.target.value.toString()))}//({ target }) => onRoleUpdated( row.id, target.value )

                      >
                        <MenuItem value={1}> Abierta </MenuItem>
                        <MenuItem value={2}>En evaluación</MenuItem>
                        <MenuItem value={3}> Cerrada</MenuItem>

                      </Select> */}

                    </Box>
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Item elevation={4}>
                  <Box display={'flex'} justifyContent={'space-around'} padding={1} alignItems={'center'}>
                    <CategoryIcon sx={{ fontSize: 60 }} color={'primary'} />
                    <Box><Typography color={'#454555'} variant="body1" > Categoria</Typography>
                      <Typography color={'#454555'} fontWeight={'bold'} fontSize={28} textTransform={'capitalize'}>{convocatoria.categoria.nombre} </Typography>

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
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h4" textTransform={'uppercase'}>{seleccionados.length} </Typography>

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
                      <Typography fontWeight={'bold'} color={'#454555'} variant="h4" >{descartados.length} </Typography>

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
                height={matches ? 400 : 650}
                sx={{

                  width: '100%',
                  '& .mal': {
                    backgroundColor: '#ff5722',
                    color: '#FFF',
                  },
                  '& .medio': {
                    backgroundColor: '#d47483',
                    color: '#1a3e72',
                  },
                  '& .bien': {
                    backgroundColor: 'rgba(157, 255, 118, 0.49)',
                    color: '#1a3e72',
                  },
                  '& .sindatos': {
                    backgroundColor: 'rgba(157, 255, 225, 0.49)',
                    color: '#1a3e72',
                  },
                }} >

                <DataGrid
                  loading={isLoading}
                  localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                  rows={rows}
                  columns={columns}
                  getCellClassName={(params: GridCellParams<any, any, number>) => {
                    if (params.field !== 'total' || params.value == null) {
                      return '';
                    }
                    return params.value >= 75 ? 'bien' : 'mal';
                  }}
                  slots={{ toolbar: GridToolbar }}
                  slotProps={{
                    toolbar: {
                      showQuickFilter: true,
                      quickFilterProps: { debounceMs: 500 },
                    },
                  }}

                  initialState={{

                    pagination: { paginationModel: { pageSize: 25 } },
                    columns: {
                      columnVisibilityModel: {
                        // Hide columns status and traderName, the other columns will remain visible
                        telefono: true,
                        email: false,
                        edad: true,
                      },
                    },
                  }}
                  pageSizeOptions={[5, 10, 25]}
                />


              </Box>
            </Item>

          </Box>
        </Box>
      }
      <Modal title={'Calificación por jurado'} open={modalCalificacion} handleClose={() => setModalCalificacion(false)}
        handleConfirm={() => setModalCalificacion(false)}>

        <Box display={'flex'} gap={5} justifyContent={'start'}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Jurado</TableCell>
                  <TableCell align="right">Puntaje</TableCell>
                  <TableCell align="right">Tipo</TableCell>
                  <TableCell align="right">Comentario</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {calificacion.map((e: any, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{(e.user.persona.apellido_pat + ' ' + e.user.persona.apellido_mat + ' ' + e.user.persona.nombres).toLocaleUpperCase()}</TableCell>
                    <TableCell align="right">{e.total}/{e._count.puntaje_items * 10}</TableCell>

                    <TableCell align="right" component="th" scope="row">
                      {e.user.rol.id === 5 ? 'Entrevista ' : 'Jurado'}
                    </TableCell>

                    <TableCell align="right">{e.comentario}</TableCell>

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
      {/* <ModalEntrevista title={'Calificar Entrevista'} open={open} handleClose={handleClose} >
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
      </ModalEntrevista> */}


      <Modal title={'Enviar mensaje'} open={messageModal} handleClose={() => setMessageModal(false)} handleConfirm={() => setMessageModal(false)}>
        <Box mt={1}>

          <TextField onChange={(e) => setMessage(e.target.value)} value={message} multiline rows={3} fullWidth id="outlined-basic" label="Agregar Mensaje" variant="outlined" sx={{ mb: 2 }} />
          <Box display={'flex'} justifyContent={'end'}>
            <Button sx={{ mb: 1 }} variant='contained' endIcon={<Send />} onClick={sendMessage} >Enviar</Button>
          </Box>
          <Divider />
          <Box mt={1}>
            <Typography variant='body1' fontWeight={'bold'}>Último mensaje</Typography>
            <Paper>
              <Box padding={1} mt={1}>
                <Typography >{lastMessage}</Typography>
                <Typography variant='body2' color={'gray'}>{fechaComennt ? (moment(fechaComennt).fromNow()) : 'No hay mensajes'}</Typography>
              </Box>
            </Paper>
          </Box>
          <Box mt={2} mb={2}>
            <Typography variant='body1' fontWeight={'bold'}>Últimos mensajes:</Typography>
            <Box height={280} overflow={'auto'} padding={1} bgcolor={'#FAFAFA'} ref={contentRef}>
              {mgs.map((m) => (
                <Paper key={m.id}>
                  <Box padding={2} mt={1} >
                    <Typography >{m.contenido}</Typography>
                    <Typography variant='body2' color={'gray'}>{m.fecha ? (moment(m.fecha).fromNow()) : 'No hay mensajes'}</Typography>
                  </Box>
                </Paper>
              ))
              }
            </Box>

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

      <ModalEval title={'Evaluacion'} open={openClase} handleClose={handleCloseClase} items={items} >

      </ModalEval>
      <Modal title={'El postulante será contratado'} open={openContrato} handleClose={() => setOpenContrato(false)} handleConfirm={contratar}>

        <Box textAlign={'center'} mt={3}>
          <TextField
            type='number'
            label="Monto Negociado"
            id="outlined-start-adornment"
            value={monto}
            error={error}
            onChange={onMontoChange}
            sx={{ m: 1, width: '100%' }}
            InputProps={{
              startAdornment: <InputAdornment position="start">S/</InputAdornment>,
            }}
            inputProps={{
              max: 10000,
              min: 0
            }}
          />
          <FormHelperText>Debe ingresar el monto negociado con el postulante</FormHelperText>

        </Box>


      </Modal>
    </Paperbase>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id = '' } = query;
  const session: any = await getSession({ req });

  const { user } = session;
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
        select: { id: true, nombre: true }
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

  const items = await prisma.test.findMany({
    where: {
      categoria_id: 3
    },
    select: {
      id: true,
      item: true
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
