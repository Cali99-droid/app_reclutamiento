import { IJob, IUser } from "@/interfaces";
import { GetServerSideProps, NextPage } from "next";
import { prisma } from '@/server/db/client';
import { Paperbase } from "@/components/dash";
import { convocatoria } from '@prisma/client';
import { DataGrid, GridActionsCellItem, GridCellParams, GridCloseIcon, GridColDef, GridToolbar, esES } from "@mui/x-data-grid";
import NextLink from 'next/link';
import { Box, Button, Divider, FormControl, IconButton, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Paper, Select, SelectChangeEvent, TextField, Tooltip, Typography, styled, useMediaQuery } from "@mui/material";
import { CustomChip } from "@/components/ui";
import StarsIcon from '@mui/icons-material/Stars';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GavelIcon from '@mui/icons-material/Gavel';
import { green, yellow } from "@mui/material/colors";
import { useRouter } from "next/router";
import Modal from '../../../../components/modal/Modal';
import { useState, useRef, useContext } from "react";
import { usePostulantes } from "@/hooks";
import { calcularEdad, formatoNombre, getEstado } from "@/helpers/functions";
import moment from "moment";
import { devolverPuntajeEntrevista, devolverPuntajeJurado } from "@/helpers/puntajes";
import BodyMessage from '../../../../components/convocatoria/modal/BodyMessage';

import { PostContext } from "@/context";
import ModalEval from "@/components/eval/test";
import BodyCalificacion from '../../../../components/convocatoria/modal/BodyCalificacion';

import { toast } from "react-toastify";
import ModalJurado from "@/components/convocatoria/modal/ModalJurado";
import { useEffect } from 'react';
import Cards from '../../../../components/convocatoria/panel/Cards';
import { Jurados, NavegacionConvo } from "@/components/convocatoria";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalContrato from '../../../../components/convocatoria/modal/ModalContrato';


interface Props {

  convocatoria: IJob
  items: any[]
  jurados: IUser[];

}


export default function AnnouncementPage({ convocatoria, jurados, items }: Props) {
  const { pos, isLoading } = usePostulantes(`/admin/postulantes/${convocatoria.id}`);

  const router = useRouter();
  const { id } = router.query
  const contratados = pos.filter(d => d.estado_postulante_id !== 7)
  const [postulantes, setPostulantes] = useState(pos)
  const { openClase, handleOpenClase, handleCloseClase } = useContext(PostContext);
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

  const rows = postulantes.map((p, index) => ({
    id: index + 1,
    postulante: formatoNombre(p.postulante.persona.nombres, p.postulante.persona.apellido_pat, p.postulante.persona.apellido_mat),
    estado: p.estado_postulante.nombre,
    estadoId: p.estado_postulante.id,
    edad: calcularEdad(p.postulante.nacimiento) + ' años',
    idPos: p.postulante.id,
    sueldo: 'S/ ' + p.postulante.sueldo,
    puntajeEntr: devolverPuntajeEntrevista(p.postulante.puntajes).porcentaje,
    puntajeJur: devolverPuntajeJurado(p.postulante.puntajes).porcentaje,

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
  const slots = {
    toolbar: GridToolbar
  };

  const [messageModal, setMessageModal] = useState(false)
  const [idPosConv, setIdPosConv] = useState<string | number>('');
  const [phone, setPhone] = useState<string | number>('');
  const [mgs, setMgs] = useState<any[]>([])

  function handleOpenMessage(id: any, comentario: string, fecha: string, phone: number, mesagges: string[]) {
    setMessageModal(true)
    setIdPosConv(id)
    setPhone(phone);
    setMgs(mesagges);

  }

  const [calificacion, setCalificacion] = useState<any[]>([])
  const [modalCalificacion, setModalCalificacion] = useState(false)
  const hadleOpenCalificacion = (puntajes: any[]) => {
    setCalificacion(puntajes);
    setModalCalificacion(true);
  }

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 10

  }));

  const { refreshJurados } = useContext(PostContext);
  const [juradoModal, setJuradoModal] = useState(false);
  const handleOpenJurados = () => {
    setJuradoModal(true);
  }

  const [filtrando, setFiltrando] = useState(true)
  useEffect(() => {

    if (!isLoading) {
      setPostulantes(pos.filter(d => d.estado_postulante_id !== 4))
    }
    if (!filtrando) {
      setPostulantes(pos)
    }
    refreshJurados();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrando, isLoading, pos])


  const [openContrato, setOpenContrato] = useState(false)
  const [idPos, setIdPos] = useState<string | number>('');
  const handleOpenContrato = (idPosConv: number, idPos: number) => {
    setIdPosConv(idPosConv)
    setIdPos(idPos)
    setOpenContrato(true);
  }
  const matches = useMediaQuery('(min-width:600px)');
  return (

    <Paperbase title={`Administrar convocatoria: ${convocatoria.titulo} `} subTitle={"Resumen"}>
      <Box sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible', position: 'relative', } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }} className="fadeIn"  >

        <NavegacionConvo convocatoria={convocatoria} />
        <Box display={'flex'} gap={3} flexDirection={matches ? 'row' : 'column'} >
          <Cards convocatoria={convocatoria} postulantes={pos} />
          <Jurados handleOpen={handleOpenJurados} />
        </Box>


        <Box mt={2}>
          <Item elevation={1} sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 400, margin: 'auto', overflow: 'visible' }}>
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
          </Item>
        </Box>
        <Box
          height={matches ? 400 : 650}
          mt={1}
          bgcolor={'#FFF'}
          borderRadius={.9}
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
          }}

        >
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
            slots={slots}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  telefono: true,
                  email: false,
                },
              },
            }}

          />

        </Box>


      </Box>

      {/* Ventanas Modales */}
      {/* Modal Mensajes */}
      <Modal title={'Enviar mensaje'} open={messageModal} handleClose={() => setMessageModal(false)} handleConfirm={() => setMessageModal(false)}>
        <BodyMessage mgs={mgs} idPosConv={idPosConv} phone={phone} />
      </Modal>
      {/* Modal Evaluacion */}
      <ModalEval title={'Evaluacion'} open={openClase} handleClose={handleCloseClase} items={items} >
      </ModalEval>
      {/* Modal para ver las calificaciones */}
      <Modal title={'Calificación por jurado'} open={modalCalificacion} handleClose={() => setModalCalificacion(false)}
        handleConfirm={() => setModalCalificacion(false)}>
        <BodyCalificacion calificacion={calificacion} />
      </Modal>
      {/* Modal para asignar jurados */}
      <ModalJurado jurados={jurados} open={juradoModal} handleClose={() => setJuradoModal(false)} >
      </ModalJurado>

      {/* Modal para contratar */}
      <ModalContrato handleClose={() => setOpenContrato(false)} idPosConv={idPosConv} idPos={idPos} open={openContrato}>

      </ModalContrato>
    </Paperbase>
  );

}




export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
  const { id = '' } = query;
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

  const items = await prisma.test.findMany({
    where: {
      categoria_id: 3
    },
    select: {
      id: true,
      item: true
    }
  })
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
  const convocatoria = JSON.parse(JSON.stringify(resConvocatoria))

  const jurados = JSON.parse(JSON.stringify(juradosSer))
  return {
    props: { convocatoria, items, jurados },

  }
}