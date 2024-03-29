import { prisma } from '@/server/db/client';


import { JobsLayout } from "@/components/layouts";

import { IAficion, ICapacitacion, ICargo, IEstudio, IInvestigacion, IReconocimiento, ITics } from "@/interfaces";
import { Box, Button, Typography, Grid, styled, Paper, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, tableCellClasses, useMediaQuery, Link, colors, Divider, IconButton, Card, CardMedia, CardActions, Modal } from '@mui/material';

import { GetServerSideProps, NextPage } from "next";
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { calcularEdad } from '@/helpers/functions';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import PersonIcon from '@mui/icons-material/Person';
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
import moment from 'moment';
import { ArrowBack, Edit, Padding } from '@mui/icons-material';

import FilePresentIcon from '@mui/icons-material/FilePresent';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import client from '@/aws3-config';
import { reclutApi } from '@/apies';
import { useState } from 'react';
import { ModalAlert, ModalPDF } from '@/components/modal';
import { toast } from 'react-toastify';


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

    padding: theme.spacing(1),




}));

const imageStyle = {
    borderRadius: '50%',
    border: '3px solid #FFF',

};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#4565D0',
        color: theme.palette.common.white,
        fontWeight: 600,
        padding: 12,


    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const FichaPage: NextPage<Props> = ({ postulante }) => {

    const { push } = useRouter()
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const matches = useMediaQuery('(min-width:600px)');
    // const { isLoggedIn, user } = useContext(AuthContext);
    const [modPdf, setModPdf] = useState(false);
    const handleClose = () => {
        setModPdf(false)
        setPdfUrl(null);
    }
    const download = async (filename: any) => {

        console.log(filename)


        try {
            const response = await reclutApi.get(`download/${filename}`)
            console.log(response.data.str)
            if (response.data.str) {
                const dataUri = `data:application/pdf;base64,${response.data.str}`;
                setModPdf(true);
                setPdfUrl(dataUri);
            } else {
                console.error('Archivo no encontrado.');
                toast.error('Archivo no encontrado');
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <JobsLayout title={"Postulante "} pageDescription={'Ficha'} >

            <Box bgcolor={'#EDF1F7'} paddingBottom={6} mt={6}>


                <Box className="fadeIn" sx={matches ? { maxWidth: 1200, margin: 'auto', overflow: 'visible' } : { maxWidth: '95%', margin: 'auto', overflow: 'visible' }} pt={15}  >

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={10}>
                            <Item elevation={1} sx={{ background: 'linear-gradient(to right, #0045aa 0%,#4565d0 31%,#7087f7 64%,#7db9e8 100%); ', padding: 1 }} >
                                <Typography fontWeight={'bold'} color={'#FFF'}>Mi Ficha </Typography>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={2} >
                            <Button
                                endIcon={<Edit />}
                                size='large'

                                sx={{ width: '100%', bgcolor: '#7db9e8', }}
                                onClick={() => push('/postulant')}>
                                Actualizar
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Item elevation={1}>
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Image
                                        src={(postulante.image === null ? '/avatar.png' : `${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${postulante.image}`)}
                                        width={150}
                                        height={150}
                                        alt="Imagen postulante"
                                        priority
                                        style={imageStyle}
                                    />
                                </Box>
                                <Box mt={2} textAlign={'center'}>
                                    <Typography color={'#454555'}> {postulante.persona.nombres + ' ' + postulante.persona.apellido_pat + ' ' + postulante.persona.apellido_mat}</Typography>
                                    <Typography fontSize={12}> {calcularEdad(postulante.nacimiento)} Años</Typography>
                                    <Box ml={1} mt={1} display={'flex'} flexDirection={'column'} alignItems={'start'} gap={1}>

                                        <Box display={'flex'} gap={1}>
                                            <FmdGoodIcon color='primary' /> <Typography fontSize={12} >  {postulante.direccion.length > 0 ? postulante.direccion : 'Sin datos'}</Typography>
                                        </Box>
                                        <Box display={'flex'} gap={1}>
                                            <PhoneIcon color='primary' /> <Typography fontSize={12}>  {postulante.telefono.length > 0 ? postulante.telefono : 'Sin datos'}</Typography>
                                        </Box>
                                        <Box display={'flex'} gap={1}>

                                            <MailIcon color='primary' /> <Typography fontSize={12}>  {postulante.persona.user[0].email}</Typography>
                                        </Box>
                                    </Box>





                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12} sm={9}  >
                            <Item sx={matches ? { height: 'auto' } : { height: 'auto' }} >
                                {/* <Typography variant='h2'>Mis datos</Typography> */}
                                <Box display={'flex'} justifyContent={'space-between'} padding={1} flexDirection={matches ? 'row' : 'column'} >
                                    <Box display={'flex'} flexDirection={'column'} gap={4} >
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Numero de Documento: </Typography>
                                            <Typography color={'#454555'}>{postulante.numeroDocumento}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Nacimiento: </Typography>
                                            <Typography color={'#454555'}> {moment(postulante.nacimiento).add(1, 'days').toDate().toLocaleDateString()}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Pretención Salarial:</Typography>
                                            <Typography color={'#454555'}> S/ {postulante.sueldo}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Estado Civil: </Typography>
                                            <Typography color={'#454555'}>{postulante.estado_civil || 'Sin Datos'}</Typography>
                                        </Box>


                                    </Box>
                                    <Box display={'flex'} flexDirection={'column'} gap={4} mt={matches ? 0 : 3}>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Numero de Hijos: </Typography>
                                            <Typography color={'#454555'}>{postulante.hijos || 'Sin Datos'}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Persona con discapacidad:  </Typography>
                                            <Typography color={'#454555'}>{postulante.discapacidad === 1 ? ' Si ' : 'No'}</Typography>
                                        </Box>
                                        <Box>
                                            <Typography color={'#454555'} fontWeight={'bold'}>Exalumno: </Typography>
                                            <Typography color={'#454555'}> {postulante.exalumno === 1 ? ' Si ' : 'No'}</Typography>
                                        </Box>

                                    </Box>
                                    <Box width={200}>
                                        <Grid container spacing={1}>
                                            {
                                                postulante.dni_image.map((img: any) => (
                                                    <Grid item xs={12} sm={6} key={img.image}>
                                                        <Card>
                                                            <CardMedia
                                                                height={250}
                                                                component='img'
                                                                className='fadeIn'
                                                                image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${img.image || img}`}
                                                                alt={'imagen dni'}
                                                            />
                                                            <CardActions>
                                                                <Button
                                                                    fullWidth
                                                                    color="info"
                                                                    href={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${img.image}`}
                                                                    target='_blank'
                                                                >
                                                                    Ver
                                                                </Button>
                                                            </CardActions>
                                                        </Card>

                                                    </Grid>
                                                ))
                                            }
                                        </Grid>
                                    </Box>
                                    {/* <Box display={'flex'} flexDirection={'column'} gap={2}>
                                    <Button variant="contained" onClick={() => router.push('/postulant/')} color="primary">
                                        Editar
                                    </Button>

                                    <Button variant="contained" onClick={() => router.push('/postulant/')} color="primary" >
                                        Exportar PDF
                                    </Button>
                                </Box> */}
                                </Box>
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>
                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <SchoolIcon color='primary' />
                                        <Typography fontWeight={'bold'} color={'primary'}>ESTUDIOS / PROFESIONES</Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>
                                        {
                                            postulante.estudios.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
                                                <TableContainer  >
                                                    <Table aria-label="simple table" >

                                                        <TableHead >
                                                            <TableRow>
                                                                <StyledTableCell >Profesión</StyledTableCell>
                                                                <StyledTableCell align="right">Institución</StyledTableCell>
                                                                <StyledTableCell align="right">Grado</StyledTableCell>
                                                                <StyledTableCell align="right">Año</StyledTableCell>
                                                                <StyledTableCell align="right">Doc</StyledTableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {postulante.estudios.map((e: IEstudio) => (
                                                                <TableRow
                                                                    key={e.id}
                                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                                >
                                                                    <TableCell component="th" scope="row">
                                                                        {e.profesion}
                                                                    </TableCell>
                                                                    <TableCell align="right">{e.institucion}</TableCell>
                                                                    <TableCell align="right">{e.grado}</TableCell>
                                                                    <TableCell align="right">{e.year}</TableCell>
                                                                    <TableCell align="right">

                                                                        <IconButton disabled={e.doc ? false : true} onClick={() => download(e.doc)}>
                                                                            <FilePresentIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        }


                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <WorkIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} color={'primary'} >EXPERIENCIA LABORAL (Relacionada al puesto)</Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>
                                        {
                                            postulante.cargo.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
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
                                                            {postulante.cargo.map((e: ICargo) => (
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

                                                                        <IconButton disabled={e.doc ? false : true} onClick={() => download(e.doc)}>
                                                                            <FilePresentIcon />
                                                                        </IconButton>
                                                                    </TableCell>

                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        }



                                    </Box>
                                </Box>

                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <BiotechIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} color={'primary'}>INVESTIGACIONES, PROYECTOS U OTROS TRABAJOS ACADÉMICOS REALIZADOS COMO EXPERIENCIA</Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>
                                        {
                                            postulante.investigacion.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
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
                                                            {postulante.investigacion.map((e: IInvestigacion) => (
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
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <MilitaryTechIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} textTransform={'uppercase'} color={'primary'}>Capacitaciones/Cursos</Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>

                                        {
                                            postulante.capacitacion.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
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
                                                            {postulante.capacitacion.map((e: ICapacitacion) => (
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

                                                                        <IconButton disabled={e.doc ? false : true} onClick={() => download(e.doc)}>
                                                                            <FilePresentIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        }

                                    </Box>
                                </Box>
                            </Item>
                        </Grid>

                        <Grid item xs={12}>
                            <Item>


                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <EmojiEventsIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} textTransform={'uppercase'} color={'primary'} >PRINCIPALES RECONOCIMIENTOS, DIPLOMAS, PREMIOS U OTROS RECIBIDOS EN SU VIDA LABORAL</Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>

                                        {
                                            postulante.reconocimiento.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
                                                <TableContainer   >

                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                                        <TableHead>
                                                            <TableRow>
                                                                <StyledTableCell>Reconocimiento</StyledTableCell>
                                                                <StyledTableCell align="right">Institución</StyledTableCell>
                                                                <StyledTableCell align="right">Año</StyledTableCell>
                                                                <StyledTableCell align="right">Descripción</StyledTableCell>
                                                                <StyledTableCell align="right">Doc</StyledTableCell>

                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {postulante.reconocimiento.map((e: IReconocimiento) => (
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
                                                                    <TableCell align="right">

                                                                        <IconButton disabled={e.doc ? false : true} onClick={() => download(e.doc)}>
                                                                            <FilePresentIcon />
                                                                        </IconButton>
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>
                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <DevicesIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} color={'primary'} textTransform={'uppercase'} >USO DE  TECNOLOGÍAS </Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>

                                        {
                                            postulante.tics.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
                                                <TableContainer   >

                                                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                                        <TableHead>
                                                            <TableRow>

                                                                <StyledTableCell >Tecnologia</StyledTableCell>
                                                                <StyledTableCell align="right">Nivel</StyledTableCell>


                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {postulante.tics.map((e: ITics) => (
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
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid item xs={12}>
                            <Item>


                                <Box padding={1}>
                                    <Box display={'flex'} alignItems={'center'} gap={1}>
                                        <NaturePeopleIcon color={'primary'} />
                                        <Typography fontWeight={'bold'} color={'primary'} textTransform={'uppercase'} >OTRAS ACTIVIDADES, AFICIONES O HABILIDADES APRENDIDAS Y/O ESTUDIADAS </Typography>
                                    </Box>
                                    <Divider />
                                    <Box maxWidth={matches ? '100%' : 400} mt={3}>

                                        {
                                            postulante.aficion.length === 0 ? (
                                                <Typography textAlign={'center'} mt={5}>No hay datos agregados</Typography>

                                            ) : (
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
                                                            {postulante.aficion.map((e: IAficion) => (
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
                                            )
                                        }
                                    </Box>
                                </Box>
                            </Item>
                        </Grid>




                    </Grid>




                </Box>
                {pdfUrl && (
                    <ModalPDF title={'Mostrando'} open={modPdf} handleClose={handleClose} handleConfirm={handleClose}>
                        <Box width={800}>
                            <p>PDF descargado:</p>
                            <iframe
                                src={pdfUrl}
                                width="100%"
                                height="600"
                            />
                        </Box>
                    </ModalPDF>

                )}
            </Box>

        </JobsLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )

    const session: any = await getSession({ req });
    const { user } = session;

    const post = await prisma.postulante.findFirst({
        where: {
            persona_id: parseInt(user.persona.id)
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
            tics: true,
            dni_image: true,

        }
    })


    const postulante = JSON.parse(JSON.stringify(post))



    return {
        props: {
            postulante,
        }
    }
}


export default FichaPage