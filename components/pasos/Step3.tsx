import { Box, Button, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, tableCellClasses, styled, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText, useMediaQuery, LinearProgress } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useState } from 'react';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';

import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { validations } from '@/helpers';
import { Download, Edit, UploadFileOutlined } from '@mui/icons-material';
import { reclutApi } from '@/apies';
import axios from 'axios';

const inputProps = {
    max: '50',
    min: '0',

};
const Step3 = () => {
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const { investigaciones, setInvestigaciones, cargos, agregarInvestigacion, editarInvestigacion, quitarInvestigacion, agregarCargo, editarCargo, quitarCargo } = useContext(DatosContext);
    useEffect(() => {


        setInvestigaciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [error, setError] = useState(false)
    //------------------Modal Investigaciones------------------------------

    const [idInvestigacion, setIdInvestigacion] = useState<number | null>()
    const [openInves, setOpenInves] = useState(false)
    const handleOpenInves = () => {
        setOpenInves(true);
    }
    const handleCloseInves = () => {
        setOpenInves(false);
        setError(false)
        setInstitucion('')
        setTitulo('')
        setYear('')
    }
    const handleConfirmInves = () => {

        if (titulo.length === 0 || year.length === 0 || institucion.length === 0 || IdPos.length === 0) {
            toast.warning('Complete todos los campos obligatorios')
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }

        if (idInvestigacion) {
            editarInvestigacion(idInvestigacion, titulo, institucion, year, IdPos)
            toast.success('Actualizado con éxito')
        } else {
            agregarInvestigacion(titulo, institucion, year, IdPos)
            toast.success('Agregado con éxito')
        }

        setInstitucion('')
        setTitulo('')

        handleCloseInves()

    }
    const handleDelete = (id: number) => {
        quitarInvestigacion(id)
    }
    //-------------------------Investigaciones----------------
    const [titulo, setTitulo] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [year, setYear] = useState(new Date().getFullYear().toString())

    const onNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setTitulo(event.target.value);

    }
    const notificacion = async (error: string) => {
        try {
            const { data } = await reclutApi.post('/noti', { error });

            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }


        }
    }
    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setInstitucion(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setYear(event.target.value);

    }
    function handleEditInvestigacion(id: number, titulo: string, institucion: string, year: string): void {
        handleOpenInves()
        setIdInvestigacion(id)
        setInstitucion(institucion)
        setTitulo(titulo)
        setYear(year)
    }
    //.......................Modal Cargos  .............

    const [idCargo, setIdCargo] = useState<number | null>()


    const [openCargo, setOpenCargo] = useState(false)
    const handleOpenCargo = () => {
        setOpenCargo(true);
    }
    const handleCloseCargo = () => {
        setOpenCargo(false);
        setError(false)
        setIdCargo(null)
        setReferencia('')
        setNivel('')
        setCantidad('')
        setRemuneracion('')
        setInstitucion('')
        setDescripcion('')
        setContacto('')
        setYear('')
    }
    const [doc, setDoc] = useState<string | null>(null);
    const handleConfirmCargo = () => {


        if (nivel.length === 0 || year.length === 0 || institucion.length === 0 || remuneracion.length === 0 || descripcion.length === 0 || IdPos.length === 0 || error === true) {
            toast.warning('Complete todos los campos obligatorios')
            setError(true)
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }
        if (idCargo) {
            editarCargo(idCargo, referencia, contacto, nivel, cantidad, year, institucion, remuneracion, descripcion, IdPos, doc)
            toast.success('Actualizado con éxito')
        } else {
            agregarCargo(referencia, contacto, nivel, cantidad, year, institucion, remuneracion, descripcion, IdPos, doc)
            toast.success('Agregado con éxito')
        }

        setReferencia('')
        setNivel('')
        setCantidad('')
        setRemuneracion('')
        setInstitucion('')
        setDescripcion('')
        handleCloseCargo()

    }
    const handleDeleteCargo = (id: number) => {
        quitarCargo(id)
    }

    //..............Cargos...........................


    const [referencia, setReferencia] = useState('')
    const [nivel, setNivel] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [remuneracion, setRemuneracion] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [contacto, setContacto] = useState('')
    const [mensaje, setMensaje] = useState('')

    const onContactoChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        } else {
            setError(false)

        }
        setContacto(event.target.value);

    }
    const onRefChange = (event: ChangeEvent<HTMLInputElement>) => {


        if (!validations.isValidTelephone(event.target.value.toString()) && event.target.value.length >= 1) {
            setError(true)
            setMensaje('El numero de telefono no parece ser válido')
        } else {
            setError(false)
            setMensaje('')

        }
        setReferencia(event.target.value);


    }
    const onNivelChange = (event: SelectChangeEvent<string>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        } else {
            setError(false)

        }
        setNivel(event.target.value);

    }
    const onCantidadChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        } else {
            setError(false)

        }

        setCantidad(event.target.value);
    }
    const onRemuneracionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        } else {
            setError(false)

        }
        setRemuneracion(event.target.value);

    }
    const onDescipcionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        } else {
            setError(false)

        }
        setDescripcion(event.target.value);

    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#0045aa',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
    function handleEdit(id: number, descripcion: string, institucion: string, referencia: string, contacto: string, nivel: string, cantidadCargo: string, remuneracion: string, year: string, doc: any): void {
        setOpenCargo(true)
        setIdCargo(id),
            setDescripcion(descripcion);
        setInstitucion(institucion);
        setReferencia(referencia);
        setContacto(contacto);
        setRemuneracion(remuneracion);
        setYear(year)
        setNivel(nivel);
        setCantidad(cantidadCargo)
        setDoc(doc)

    }

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);
    const [loadDoc, setLoadDoc] = useState(false)
    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        const selectedFile = target.files[0];
        toast.info('Subiendo Documento')
        setLoadDoc(true)
        try {


            const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/docupload', {
                name: target.files[0].name,
                type: target.files[0].type
            });

            const url = data.url;
            const res = await reclutApi.put(url, target.files[0], {
                headers: {
                    "Content-type": target.files[0].type,
                    "Access-Control-Allow-Origin": "*"
                }
            })

            toast.success('Documento Subido Corretamente')

            setLoadDoc(false)
            setDoc(data.message);




        } catch (error) {
            setLoadDoc(false)
            notificacion('error al subir foto en doc')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
            console.log({ error });
        }


    }
    const handleReplaceFile = () => {
        setFile(null);
        setDoc(null);
    };
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box padding={matches ? 4 : 0} mt={3} className="fadeIn" >

            <Box bgcolor={'#FFF'} padding={2} borderRadius={2} >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={1} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} >
                        <Typography fontWeight={'bold'} textTransform={'uppercase'}>Experiencia profesional relacionada al cargo </Typography>
                    </Box>
                    <Button fullWidth={!matches} onClick={handleOpenCargo} variant="contained" startIcon={<AddIcon />}>Agregar</Button>


                </Box>
                <Divider />
                {
                    cargos.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay cargos</Typography>

                    ) : (
                        <TableContainer   >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell align="right">Año</StyledTableCell>
                                        <StyledTableCell>Cargo</StyledTableCell>
                                        <StyledTableCell align="right">Institución</StyledTableCell>
                                        <StyledTableCell align="right">Referencia</StyledTableCell>
                                        {/* <StyledTableCell align="right">Nivel</StyledTableCell> */}
                                        {/* <StyledTableCell align="right">Personas a cargo</StyledTableCell> */}
                                        <StyledTableCell align="right">Remuneración</StyledTableCell>

                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cargos.map((e) => (
                                        <TableRow
                                            key={e.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="right">{e.year}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {e.descripcion}
                                            </TableCell>
                                            <TableCell align="right">{e.institucion}</TableCell>
                                            <TableCell align="right">{`${e.referencia}(${e.contacto})`}</TableCell>
                                            {/* <TableCell align="right">{e.nivel}</TableCell> */}
                                            {/* <TableCell align="right">{e.cantidadCargo}</TableCell> */}
                                            <TableCell align="right">S/ {parseFloat(e.remuneracion)}</TableCell>

                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEdit(e.id, e.descripcion, e.institucion, e.referencia, e.contacto, e.nivel, e.cantidadCargo, e.remuneracion, e.year, e.doc)} >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteCargo(e.id)} color='error'>
                                                    <DeleteForeverIcon />
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
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} mb={1} justifyContent={'space-between'} alignItems={'center'} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} >
                        <Typography fontWeight={'bold'}> INVESTIGACIONES, PROYECTOS U OTROS TRABAJOS ACADÉMICOS REALIZADOS COMO EXPERIENCIA </Typography>
                    </Box>
                    <Button fullWidth={!matches} onClick={handleOpenInves} startIcon={<AddIcon />}>Agregar</Button>


                </Box>


                <Divider />

                {
                    investigaciones.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay Investigaciones</Typography>

                    ) : (
                        <TableContainer   >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Investigación</StyledTableCell>
                                        <StyledTableCell align="right">Institución</StyledTableCell>
                                        <StyledTableCell align="right">Año</StyledTableCell>
                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {investigaciones.map((e) => (
                                        <TableRow
                                            key={e.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {e.titulo}
                                            </TableCell>
                                            <TableCell align="right">{e.institucion}</TableCell>

                                            <TableCell align="right">{e.year}</TableCell>
                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditInvestigacion(e.id, e.titulo, e.institucion, e.year)} >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(e.id)} color='error'>
                                                    <DeleteForeverIcon />
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
            <Modal
                title={'Agregar Investigación'}
                open={openInves}
                handleClose={handleCloseInves}
                handleConfirm={handleConfirmInves}
            >
                <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, },
                    }}
                    noValidate
                    autoComplete="on"

                >
                    <TextField
                        autoFocus
                        multiline
                        id="nombre"
                        label="Titulo de la investigación"
                        placeholder='Titulo de la investigación'
                        variant="outlined"
                        error={error && titulo.length <= 0}
                        value={titulo}
                        onChange={onNombreChange}
                        required

                    />
                    <TextField

                        multiline
                        required
                        id="institucion"
                        label="Nombre de la institución"
                        placeholder='Nombre de la institución'
                        variant="outlined"
                        error={error && institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}
                        helperText='*institución donde realizó la investigación'

                    />
                    <TextField
                        required
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={error && year.length <= 0 || year.length > 4}
                        onChange={onYearChange}
                        helperText='*año en el que se realizó la investigación'
                        inputProps={{
                            max: 3000,
                            min: 1950
                        }}
                    />


                </Box>


            </Modal>
            {/* {.................CARGOS MODAL.............} */}
            <Modal
                title={'Agregar Cargo'}
                open={openCargo}
                handleClose={handleCloseCargo}
                handleConfirm={handleConfirmCargo}
            >
                <Box display={'flex'} flexDirection={'column'} gap={1} mt={1}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, },
                    }}
                    noValidate
                    autoComplete="on"

                >
                    <TextField

                        autoFocus
                        id="descripcion"
                        label="Descripción del cargo"
                        placeholder='Dirección, subdirección, coordinaciones,etc.
                        '
                        required
                        variant="outlined"
                        error={error && descripcion.length <= 0}
                        value={descripcion}
                        onChange={onDescipcionChange}

                    />
                    <TextField


                        id="institucion"
                        label="Institución"
                        placeholder='Nombre de la institución donde laboró'
                        variant="outlined"
                        required
                        error={error && institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}

                    />
                    <TextField

                        id="referencia"
                        label="Número de Referencia (opcional)"
                        placeholder='Numero del contacto de referencia'
                        type='number'
                        variant="outlined"
                        error={mensaje.length > 0}
                        value={referencia}
                        onChange={onRefChange}
                        helperText={mensaje}

                    />
                    <TextField

                        id="contacto"
                        label="Nombre del contacto referencia (opcional)"
                        placeholder='Nombre de contacto de referencia'
                        type='text'
                        variant="outlined"
                        error={mensaje.length > 0}
                        value={contacto}
                        onChange={onContactoChange}


                    />

                    <Box width={'96%'} marginLeft={1}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                            <Select

                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={nivel}
                                label="Nivel"
                                onChange={(e) => onNivelChange(e)}
                                error={error}
                            >
                                <MenuItem value={'Inicial'}>Inicial</MenuItem>
                                <MenuItem value={'Primaria'}>Primaria</MenuItem>
                                <MenuItem value={'Secundaria'}>Secundaria</MenuItem>
                                <MenuItem value={'Superior'}>Superior</MenuItem>
                                <MenuItem value={'general docente'}>General Docente</MenuItem>
                                <MenuItem value={'general administrativo'}>General Administrativo</MenuItem>
                                <MenuItem value={'Otro'}>Otro</MenuItem>

                            </Select>

                        </FormControl>
                    </Box>
                    <TextField
                        type='number'
                        id="cantidadCargo"
                        label="Cantidad de personas a cargo (opcional)"
                        variant="outlined"
                        value={cantidad}
                        // error={error && cantidad.length <= 0}
                        inputProps={inputProps}
                        onChange={onCantidadChange}

                    />
                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Remuneracion"
                        variant="outlined"
                        value={remuneracion}
                        error={error && remuneracion.length <= 0}
                        required
                        onChange={onRemuneracionChange}
                        inputProps={{
                            max: 20000,
                            min: 100
                        }}
                    />

                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={error && year.length <= 0 || year.length > 4}

                        onChange={onYearChange}
                        helperText='*año en el que laboró'
                        inputProps={{
                            max: 3000,
                            min: 1950
                        }}
                    />

                    <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>
                    {doc && !matches && (<IconButton target='_blank' href={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc}`}>
                        <Download /> Descargar Certificado
                    </IconButton>)}
                    {doc && matches && (


                        <Box display={'flex'} alignItems={'center'}  >
                            <Box>

                            </Box>
                            <Box >
                                <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Cargando...</Typography>
                                <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                                <InputLabel id="demo-simple-label">Vista previa del certificado</InputLabel>
                                <object onLoad={() => setLoadDoc(false)} data={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc}`} type="application/pdf" width="60%" height="200px">
                                    <p>No se puede previsualizar</p>
                                </object>

                            </Box>
                            <Button startIcon={<DeleteForeverIcon />} color='error' onClick={handleReplaceFile}>
                                Quitar
                            </Button>
                        </Box>


                    )}
                    <input
                        ref={fileInputRef}
                        type="file"

                        accept='.pdf'
                        style={{ display: 'none' }}
                        onChange={onFilesSelected}
                    />
                    <Button variant="outlined" startIcon={<UploadFileOutlined />} onClick={() => fileInputRef.current?.click()} disabled={doc ? true : false}>
                        Subir Certificado
                    </Button>
                    {/* <input accept='.pdf' type="file" onChange={onFilesSelected} /> */}


                </Box>


            </Modal>




        </Box>
    );
};

export default Step3;