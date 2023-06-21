import { prisma } from '@/server/db/client';

import { IEstudio } from "@/interfaces";
import { Box, Typography, Grid, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, tableCellClasses, Breadcrumbs, Link, useMediaQuery, IconButton } from '@mui/material';

import { GetServerSideProps, NextPage } from "next";

import Image from 'next/image';
import { calcularEdad } from '@/helpers/functions';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import FilePresentIcon from '@mui/icons-material/FilePresent';

import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/router';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import BiotechIcon from '@mui/icons-material/Biotech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DevicesIcon from '@mui/icons-material/Devices';
import { Paperbase } from '@/components/dash';
import { cargo, investigacion, capacitacion, reconocimiento, tics, aficion } from '@prisma/client';
import moment from 'moment';
import 'moment/locale/es';
import { DockOutlined } from '@mui/icons-material';
moment.locale('es');
interface Props {
    postulante: any


}
export const config = {
    api: {
        bodyParser: false,
    }
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF',
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,


}));

const imageStyle = {
    borderRadius: '50%',
    border: '3px solid #FFF',

};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {

        color: theme.palette.common.black,
        fontWeight: 700


    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const PostulantePage: NextPage<Props> = ({ postulante }) => {

    const router = useRouter();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Paperbase title={"Postulante "} subTitle={'ficha'}  >


            <Box className="fadeIn" sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: 350, margin: 'auto', overflow: 'visible' }} >
                <Box mb={2}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={() => router.push("/admin/convocatorias")} sx={{ cursor: 'pointer' }}
                        >
                            Convocatorias
                        </Link>
                        <Link underline="hover" sx={{ cursor: 'pointer' }} color="inherit" onClick={() => router.back()}>
                            Administrar Convocatoria
                        </Link>

                        <Typography fontWeight={'bold'} color="text.primary">{postulante.persona.nombres}</Typography>
                    </Breadcrumbs>
                </Box>


                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <Item elevation={1}>
                            Ficha del Postulante
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Item elevation={1}>
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Image
                                    priority
                                    src={(postulante.image === null ? '/avatar.jpg' : `https://plataforma-virtual.s3.us-west-2.amazonaws.com/img/${postulante.image}`)}
                                    width={150}
                                    height={150}
                                    alt="Imagen postulante"
                                    style={imageStyle}
                                />
                            </Box>
                            <Box mt={2} textAlign={'center'}>
                                <Typography > {postulante.persona.nombres + ' ' + postulante.persona.apellido_pat + ' ' + postulante.persona.apellido_mat}</Typography>
                                <Typography fontSize={12}> {calcularEdad(postulante.persona.nacimiento)} Años</Typography>
                                <Box ml={4} mt={1} display={'flex'} flexDirection={'column'} alignItems={'start'} gap={1}>

                                    <Box display={'flex'} gap={1}>

                                        <FmdGoodIcon /> <Typography fontSize={12} >  {postulante.direccion}</Typography>
                                    </Box>
                                    <Box display={'flex'} gap={1}>

                                        <PhoneIcon /> <Typography fontSize={12}>  {postulante.telefono}</Typography>
                                    </Box>
                                    <Box display={'flex'} gap={1}>

                                        <MailIcon /> <Typography fontSize={12}>  {postulante.persona.user[0].email}</Typography>
                                    </Box>
                                </Box>





                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12} sm={9} >
                        <Item sx={{ height: 340 }}>
                            {/* <Typography variant='h2'>Mis datos</Typography> */}
                            <Box display={'flex'} justifyContent={'space-between'} padding={2}>
                                <Box display={'flex'} flexDirection={'column'} gap={1}>
                                    <Typography fontWeight={'bold'}>Numero de Documento: </Typography>{postulante.numeroDocumento}
                                    <Typography fontWeight={'bold'}>Nacimiento: </Typography>{moment(postulante.nacimiento).format('L')}
                                    <Typography fontWeight={'bold'}>Pretención Salarial: </Typography>S/ {postulante.sueldo}
                                    <Typography fontWeight={'bold'}>Estado Civil: </Typography>{postulante.estado_civil}

                                </Box>
                                <Box display={'flex'} flexDirection={'column'} gap={1}>
                                    <Typography fontWeight={'bold'}>Numero de Hijos: </Typography>{postulante.hijos}
                                    <Typography fontWeight={'bold'}>Persona con discapacidad: </Typography>{postulante.discapacidad === 0 ? 'No' : 'Si'}
                                    <Typography fontWeight={'bold'}>Exalumno: </Typography>{postulante.exalumno === 0 ? 'No' : 'Si'}


                                </Box>
                                {/* <Box display={'flex'} flexDirection={'column'} gap={2}>
                                    <Button variant="contained" onClick={() => router.push('/postulant/')} color="primary" >
                                        Exportar PDF
                                    </Button>
                                </Box> */}
                            </Box>
                        </Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item>
                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <SchoolIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} >ESTUDIOS / PROFESIONES</Typography>
                                </Box>
                                <Box>
                                    <TableContainer  >
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >

                                            <TableHead >
                                                <TableRow>
                                                    <StyledTableCell >Año</StyledTableCell>
                                                    <StyledTableCell align="left">Profesión</StyledTableCell>
                                                    <StyledTableCell align="right">Institución</StyledTableCell>
                                                    <StyledTableCell align="right">Grado</StyledTableCell>
                                                    <StyledTableCell align="right">Doc</StyledTableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.estudios.map((e: IEstudio) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell >{e.year}</TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {e.profesion}
                                                        </TableCell>
                                                        <TableCell align="right">{e.institucion}</TableCell>
                                                        <TableCell align="right">{e.grado}</TableCell>
                                                        <TableCell align="right">

                                                            <IconButton disabled={e.doc ? false : true} target='_blank' href={`https://plataforma-virtual.s3.us-west-2.amazonaws.com/docs/${e.doc}`}>
                                                                <FilePresentIcon />
                                                            </IconButton>
                                                        </TableCell>



                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.estudios.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }
                                </Box>
                            </Box>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <WorkIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} >CARGOS DE RESPONSABILIDAD O DE CONFIANZA DESEMPEÑADOS</Typography>
                                </Box>
                                <Box>
                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell >Año</StyledTableCell>
                                                    <StyledTableCell>Cargo</StyledTableCell>
                                                    <StyledTableCell align="right">Institución</StyledTableCell>
                                                    <StyledTableCell align="right">Referencia</StyledTableCell>
                                                    {/* <StyledTableCell align="right">Nivel</StyledTableCell> */}
                                                    {/* <StyledTableCell align="right">Personas a cargo</StyledTableCell> */}
                                                    <StyledTableCell align="right">Remuneración</StyledTableCell>
                                                    <StyledTableCell align="right">Doc</StyledTableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.cargo.map((e: cargo) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell >{e.year}</TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {e.descripcion}
                                                        </TableCell>
                                                        <TableCell align="right">{e.institucion}</TableCell>
                                                        <TableCell align="right">{e.referencia}</TableCell>
                                                        {/* <TableCell align="right">{e.nivel}</TableCell> */}
                                                        {/* <TableCell align="right">{e.cantidadCargo}</TableCell> */}
                                                        <TableCell align="right">{e.remuneracion}</TableCell>
                                                        <TableCell align="right">

                                                            <IconButton disabled={e.doc ? false : true} target='_blank' href={`https://plataforma-virtual.s3.us-west-2.amazonaws.com/docs/${e.doc}`}>
                                                                <FilePresentIcon />
                                                            </IconButton>
                                                        </TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.cargo.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }

                                </Box>
                            </Box>
                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <BiotechIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} >INVESTIGACIONES, PROYECTOS U OTROS TRABAJOS ACADÉMICOS REALIZADOS COMO EXPERIENCIA</Typography>
                                </Box>
                                <Box>

                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Investigación</StyledTableCell>
                                                    <StyledTableCell align="right">Institución</StyledTableCell>
                                                    <StyledTableCell align="right">Año</StyledTableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.investigacion.map((e: investigacion) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.titulo}
                                                        </TableCell>
                                                        <TableCell align="right">{e.institucion}</TableCell>

                                                        <TableCell align="right">{e.year}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.investigacion.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }
                                </Box>
                            </Box>
                        </Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item>
                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <MilitaryTechIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} textTransform={'uppercase'} >Capacitaciones/Cursos</Typography>
                                </Box>
                                <Box>
                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Titulo</StyledTableCell>
                                                    <StyledTableCell align="right">Institución</StyledTableCell>
                                                    <StyledTableCell align="right">Horas</StyledTableCell>
                                                    <StyledTableCell align="right">Año</StyledTableCell>
                                                    <StyledTableCell align="right">Detalles</StyledTableCell>
                                                    <StyledTableCell align="right">Doc</StyledTableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.capacitacion.map((e: capacitacion) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.titulo}
                                                        </TableCell>
                                                        <TableCell align="right">{e.institucion}</TableCell>
                                                        <TableCell align="right">{e.horas}</TableCell>

                                                        <TableCell align="right">{e.year}</TableCell>
                                                        <TableCell align="right">{e.descripcion}</TableCell>
                                                        <TableCell align="right">

                                                            <IconButton disabled={e.doc ? false : true} target='_blank' href={`https://plataforma-virtual.s3.us-west-2.amazonaws.com/docs/${e.doc}`}>
                                                                <FilePresentIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.capacitacion.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }

                                </Box>
                            </Box>

                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <EmojiEventsIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} textTransform={'uppercase'} >PRINCIPALES RECONOCIMIENTOS, DIPLOMAS, PREMIOS U OTROS RECIBIDOS EN SU VIDA LABORAL</Typography>
                                </Box>
                                <Box>
                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Reconocimiento</StyledTableCell>
                                                    <StyledTableCell align="right">Institución</StyledTableCell>
                                                    <StyledTableCell align="right">Año</StyledTableCell>
                                                    <StyledTableCell align="right">Descripción</StyledTableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.reconocimiento.map((e: reconocimiento) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.reconocimento}
                                                        </TableCell>
                                                        <TableCell align="right">{e.institucion}</TableCell>

                                                        <TableCell align="right">{e.year}</TableCell>
                                                        <TableCell align="right">{e.descripcion}</TableCell>

                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.reconocimiento.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }
                                </Box>
                            </Box>
                        </Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item>
                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <DevicesIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} textTransform={'uppercase'} >USO DE  TECNOLOGÍAS </Typography>
                                </Box>
                                <Box>
                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>

                                                    <StyledTableCell >Tecnologia</StyledTableCell>
                                                    <StyledTableCell align="right">Nivel</StyledTableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.tics.map((e: tics) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.tecnologia}
                                                        </TableCell>
                                                        <TableCell align="right">{e.nivel}</TableCell>



                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.tics.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }
                                </Box>
                            </Box>

                            <Box padding={3}>
                                <Box display={'flex'} alignItems={'center'} gap={1}>
                                    <NaturePeopleIcon sx={{ color: '#001C75' }} />
                                    <Typography fontWeight={'bold'} textTransform={'uppercase'} >OTRAS ACTIVIDADES, AFICIONES O HABILIDADES APRENDIDAS Y/O ESTUDIADAS </Typography>
                                </Box>
                                <Box>
                                    <TableContainer   >

                                        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Actividad</StyledTableCell>
                                                    <StyledTableCell align="right">Nivel</StyledTableCell>
                                                    <StyledTableCell align="right">Logro</StyledTableCell>
                                                    <StyledTableCell align="right">Año</StyledTableCell>


                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {postulante.aficion.map((e: aficion) => (
                                                    <TableRow
                                                        key={e.id}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {e.actividad}
                                                        </TableCell>
                                                        <TableCell align="right">{e.nivel}</TableCell>
                                                        <TableCell align="right">{e.logro}</TableCell>
                                                        <TableCell align="right">{e.year}</TableCell>


                                                    </TableRow>
                                                ))}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {
                                        postulante.aficion.length === 0 && (
                                            <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                        )
                                    }
                                </Box>
                            </Box>
                        </Item>
                    </Grid>




                </Grid>




            </Box >


        </Paperbase >
    )
}


export const getServerSideProps: GetServerSideProps = async ({ query }) => {

    const { id = '' } = query;

    const post = await prisma.postulante.findUnique({
        where: {
            id: parseInt(id.toString())
        },
        include: {
            persona: {
                include: {
                    user: {
                        select: {
                            email: true
                        }
                    }
                }
            },
            estudios: true,
            cargo: true,
            investigacion: true,
            capacitacion: true,
            aficion: true,
            reconocimiento: true,
            tics: true
        }
    })


    const postulante = JSON.parse(JSON.stringify(post))


    return {
        props: {
            postulante,



        }
    }
}


export default PostulantePage