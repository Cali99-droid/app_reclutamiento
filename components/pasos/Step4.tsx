import { Box, Button, Divider, FormHelperText, IconButton, InputLabel, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import React, { useRef } from 'react';
import { DatosContext } from '@/context';
import { useContext, ChangeEvent } from 'react';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { Download, Edit, RemoveRedEye, UploadFileOutlined } from '@mui/icons-material';
import { reclutApi } from '@/apies';
import axios from 'axios';
const Step4 = () => {
    const { capacitaciones, agregarCapacitacion, editarCapacitacion, quitarCapacitacion, reconocimientos, agregarReconocimiento, editarReconocimiento, quitarReconocimiento } = useContext(DatosContext)
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const [error, setError] = useState(false)
    //--------------Modal Capacitaciones------------------
    const [idCapacitacion, setIdCapacitacion] = useState<null | number>()
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setError(false)
        setIdCapacitacion(null);
        setTitulo('');
        setInstitucion('')
        setHoras('')
        setDescripcion('');
        setYear('')
        setPreviewUrl(null);
        setSelectedFile(null);
        setDis(false)
    }

    const [selectedFile, setSelectedFile] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState<string | null>();
    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const file = target.files?.[0];

        if (file) {
            setSelectedFile(file);

            // Crear una URL de objeto para previsualizar el archivo
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    }
    const handleUpload = async () => {
        if (!selectedFile) {
            //   alert("Selecciona un archivo antes de subirlo.");
            return;
        }
        setLoadDoc(true);
        setDis(true)
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("name", selectedFile.name);
            formData.append("type", selectedFile.type);

            const { data } = await reclutApi.post("/postulants/docupload/load", formData);
            console.log(data.message);
            setSelectedFile(null);
            setLoadDoc(false);
            setDis(false)
            return data.message;

            //   if (response.ok) {
            //     alert("Archivo subido exitosamente a S3.");
            //   } else {
            //     alert("Error al subir el archivo a S3.");
            //   }
        } catch (error) {
            setDis(false)
            notificacion('error al subir foto en doc step 4')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
            setLoadDoc(false);
            console.error("Error al subir el archivo:", error);
        }
    };

    const [doc, setDoc] = useState<string | null>(null);
    const handleConfirm = async () => {
        if (titulo.length === 0 || horas.length === 0 || year.length === 0 || institucion.length === 0 || descripcion.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            setLoadDoc(false);
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            setLoadDoc(false);
            return
        }

        setDis(true)
        const nameDoc = await handleUpload();

        if (idCapacitacion) {
            editarCapacitacion(idCapacitacion, titulo, horas, year, institucion, descripcion, IdPos, nameDoc)
            toast.success('Actualizado con éxito')
            setLoadDoc(false);
            setDis(false)
        } else {
            agregarCapacitacion(titulo, horas, year, institucion, descripcion, IdPos, nameDoc)
            toast.success('Agregado con éxito')
            setLoadDoc(false);
            setDis(false)
        }

        setTitulo('')
        setHoras('')

        setInstitucion('')
        setDescripcion('')

        handleClose()
    }
    const handleDelete = (id: number) => {
        toast.info('Eliminado Registro ...')
        quitarCapacitacion(id)
    }

    const [dis, setDis] = useState(false)
    //--------------Capacitaciones------------------

    const [titulo, setTitulo] = useState('')
    const [horas, setHoras] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [year, setYear] = useState(new Date().getFullYear().toString())
    const [descripcion, setDescripcion] = useState('')

    const onTituloChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setTitulo(event.target.value);

    }
    const onHorasChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setHoras(event.target.value);

    }
    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setInstitucion(event.target.value);

    }
    const onDescripcionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setDescripcion(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setYear(event.target.value);

    }
    function handleEditCapacitacion(id: number, titulo: string, institucion: string, horas: string, descripcion: string, year: string, doc: any): void {
        handleOpen()
        setIdCapacitacion(id);
        setTitulo(titulo);
        setInstitucion(institucion)
        setHoras(horas)
        setDescripcion(descripcion);
        setYear(year)
        setDoc(doc)
        setPreviewUrl(process.env.NEXT_PUBLIC_URL_DOCS_BUCKET + doc)
    }
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);
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
    const [loadDoc, setLoadDoc] = useState(false)
    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        const selectedFile = target.files[0];
        toast.info('Cargando Documento')
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
            console.log({ error });

            setLoadDoc(false)
            notificacion('error al subir foto en doc step 4')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
        }


    }
    const handleReplaceFile = () => {
        setFile(null);
        setDoc(null);
        setPreviewUrl(null);
        setSelectedFile(null);
    };

    //------------------reconociemirteos Modal----------------
    const [openRec, setOpenRec] = useState(false)
    const [idRec, setIdRec] = useState<null | number>()
    const handleOpenRec = () => {
        setOpenRec(true);
    }
    const handleCloseRec = () => {
        setOpenRec(false);
        setReconocimiento('')
        setDis(false)
        setInstitucion('')
        setDescripcion('')

        setError(false)
        setPreviewUrlR(null),
            setSelectedFileR(null)
    }
    const [selectedFileR, setSelectedFileR] = useState<any>();
    const [previewUrlR, setPreviewUrlR] = useState<string | null>();
    const handleFileChangeR = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const file = target.files?.[0];

        if (file) {
            setSelectedFileR(file);

            // Crear una URL de objeto para previsualizar el archivo
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrlR(objectUrl);
        }
    }
    const handleUploadR = async () => {
        if (!selectedFileR) {
            // alert("Selecciona un archivo antes de subirlo.");
            return;
        }
        setLoadDoc(true);
        setDis(true)
        try {
            const formData = new FormData();
            formData.append("file", selectedFileR);
            formData.append("name", selectedFileR.name);
            formData.append("type", selectedFileR.type);

            const { data } = await reclutApi.post("/postulants/docupload/load", formData);
            console.log(data.message);
            setSelectedFile(null);
            setLoadDoc(false);
            setDis(false)
            return data.message;

            //   if (response.ok) {
            //     alert("Archivo subido exitosamente a S3.");
            //   } else {
            //     alert("Error al subir el archivo a S3.");
            //   }
        } catch (error) {

            notificacion('error al subir foto en doc step 4')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
            setLoadDoc(false);
            console.error("Error al subir el archivo:", error);
        }
    };
    const handleConfirmRec = async () => {

        if (reconocimiento.length === 0 || year.length === 0 || institucion.length === 0 || descripcion.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }

        const nameDoc = await handleUploadR();
        if (idRec) {
            editarReconocimiento(idRec, reconocimiento, year, institucion, descripcion, IdPos, nameDoc)
            setLoadDoc(false);
            toast.success('Actualizado con éxito')

        } else {
            agregarReconocimiento(reconocimiento, year, institucion, descripcion, IdPos, nameDoc)
            setLoadDoc(false);
            toast.success('Agregado con éxito')
        }

        setReconocimiento('')

        setInstitucion('')
        setDescripcion('')

        handleCloseRec()
    }
    const handleDeleteRec = (id: number) => {
        toast.info('Eliminado Registro ...')
        quitarReconocimiento(id)
    }

    const [reconocimiento, setReconocimiento] = useState('')

    const onReconocimientoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReconocimiento(event.target.value);

    }

    function handleEditReconocimiento(id: number, reconocimiento: string, institucion: string, descripcion: string, year: string, doc: any): void {
        handleOpenRec()
        setIdRec(id);
        setReconocimiento(reconocimiento)
        setInstitucion(institucion)
        setDescripcion(descripcion);
        setYear(year)
        setDocRec(doc)
        setPreviewUrlR(process.env.NEXT_PUBLIC_URL_DOCS_BUCKET + doc)
    }

    //---FILES RECONOCIMIENTOS
    const fileInputRefRec = useRef<HTMLInputElement>(null)
    const [fileRec, setFileRec] = useState<File | null>(null);
    const [docRec, setDocRec] = useState<string | null>(null);
    const onFilesSelectedRec = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        const selectedFile = target.files[0];
        toast.info('Cargando Documento')

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
            setDocRec(data.message);

            setLoadDoc(false)
        } catch (error) {
            console.log({ error });
            setLoadDoc(false)
            notificacion('error al subir foto en doc step 4 reco')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
        }


    }
    const handleReplaceFileRec = () => {
        setFileRec(null);
        setDocRec(null);
        setPreviewUrlR(null);
        setSelectedFileR(null);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#0045aa',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));


    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box padding={matches ? 4 : 0} mt={3} className="fadeIn">
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} >
                        <Typography fontWeight={'bold'} textTransform={'uppercase'}>Capacitaciones/Cursos </Typography>
                    </Box>
                    <Button fullWidth={!matches} onClick={handleOpen} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />


                {
                    capacitaciones.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay capacitaciones</Typography>

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
                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {capacitaciones.map((e) => (
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
                                                <IconButton onClick={() => handleEditCapacitacion(e.id, e.titulo, e.institucion, e.horas, e.descripcion, e.year, e.doc)} >
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



                <Modal title={'Nuevo Capacitación/Curso'} open={open} handleClose={handleClose} dis={dis} handleConfirm={handleConfirm}>
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
                            id="titulo"
                            label="Titulo"
                            placeholder='Titulo de curso'
                            variant="outlined"
                            error={error && titulo.length <= 0}
                            value={titulo}
                            onChange={onTituloChange}
                            required
                        />
                        <TextField

                            required
                            id="institucion"
                            label="Institución"
                            placeholder='Intitucion donde llevo el curso'
                            variant="outlined"
                            error={error && institucion.length <= 0}
                            value={institucion}
                            onChange={onInstitucionChange}
                        />
                        <TextField

                            type='number'
                            id="horas"
                            label="Horas"
                            placeholder='Horas'
                            variant="outlined"
                            error={error && horas.length <= 0}
                            value={horas}
                            onChange={onHorasChange}
                            required
                            inputProps={{
                                max: 1000,
                                min: 1
                            }}
                        />
                        <TextField
                            type='number'
                            id="outlined-basic"
                            label="Año"
                            variant="outlined"
                            value={year}
                            error={error && year.length <= 0 || year.length > 4}
                            required
                            onChange={onYearChange}
                            helperText='*año en el que culminó el curso'
                            inputProps={{
                                max: 3000,
                                min: 1950
                            }}
                        />
                        <TextField

                            required
                            multiline
                            id="desc"
                            label="Explique cómo aplicó lo aprendido"
                            placeholder='descripcion'
                            variant="outlined"
                            error={error && descripcion.length <= 0}
                            value={descripcion}
                            onChange={onDescripcionChange}
                        />

                        <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>
                        {doc && !matches && (<IconButton target='_blank' href={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc}`}>
                            <Download /> Descargar Certificado
                        </IconButton>)}
                        {/* {doc && matches && (


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


                        )} */}
                        <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Guardando...</Typography>
                        <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                        {previewUrl && (
                            <Box>

                                <Box display={'flex'} justifyContent={'space-evenly'}>
                                    <Typography fontSize={20}>Documento:</Typography>
                                    {selectedFile?.name}
                                    <Tooltip title="Ver documento">

                                        <IconButton target='_blank' href={previewUrl} >
                                            <RemoveRedEye />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Quitar documento"><IconButton color='error' onClick={handleReplaceFile}>
                                        <DeleteForeverIcon />
                                    </IconButton></Tooltip>


                                    <br />
                                    {/* <img src={previewUrl} alt="Vista previa del archivo" /> */}
                                </Box>
                            </Box>


                        )}
                        <input
                            ref={fileInputRef}
                            type="file"

                            accept='.pdf'
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                        />
                        <Button variant="outlined" startIcon={<UploadFileOutlined />} onClick={() => fileInputRef.current?.click()} disabled={previewUrl ? true : false}>
                            Subir Certificado
                        </Button>
                        {/* <input accept='.pdf' type="file" onChange={onFilesSelected} /> */}

                    </Box>


                </Modal>



            </Box>
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} ><Typography fontWeight={'bold'} > PRINCIPALES RECONOCIMIENTOS, DIPLOMAS, PREMIOS U OTROS RECIBIDOS EN SU VIDA LABORAL</Typography></Box>


                    <Button onClick={handleOpenRec} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />



                {
                    reconocimientos.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay reconocimientos</Typography>

                    ) : (
                        <TableContainer   >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Reconocimiento</StyledTableCell>
                                        <StyledTableCell align="right">Institución</StyledTableCell>
                                        <StyledTableCell align="right">Año</StyledTableCell>
                                        <StyledTableCell align="right">Descripción</StyledTableCell>
                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reconocimientos.map((e) => (
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
                                                <IconButton onClick={() => handleEditReconocimiento(e.id, e.reconocimento, e.institucion, e.descripcion, e.year, e.doc)} >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteRec(e.id)} color='error'>
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



                <Modal title={'Nuevo Reconocimiento'} open={openRec} handleClose={handleCloseRec} handleConfirm={handleConfirmRec} dis={dis}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, },
                        }}
                        noValidate
                        autoComplete="on"

                    >
                        <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Guardando...</Typography>
                        <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                        <TextField
                            autoFocus
                            multiline
                            required
                            id="reconocimento"
                            label="Reconocimento"
                            placeholder='Titulo del reconocimento'
                            variant="outlined"
                            error={error && reconocimiento.length <= 0}
                            value={reconocimiento}
                            onChange={onReconocimientoChange}
                        />
                        <TextField

                            id="institucion"
                            label="Institución"
                            placeholder='Intitución '
                            variant="outlined"
                            error={error && institucion.length <= 0}
                            value={institucion}
                            onChange={onInstitucionChange}
                        />

                        <TextField
                            type='number'
                            id="outlined-basic"
                            label="Año"
                            variant="outlined"
                            value={year}
                            error={error && year.length <= 0 || year.length > 4}
                            required
                            onChange={onYearChange}
                            inputProps={{
                                max: 3000,
                                min: 1950
                            }}

                        />
                        <TextField

                            multiline
                            id="desc"
                            label="Descripcion del premio"
                            placeholder='descripcion'
                            variant="outlined"
                            error={error && descripcion.length <= 0}
                            value={descripcion}
                            onChange={onDescripcionChange}
                            required
                        />
                        <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>
                        {docRec && !matches && (<IconButton target='_blank' href={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc}`}>
                            <Download /> Descargar Certificado
                        </IconButton>)}
                        {/* {docRec && matches && (


                            <Box display={'flex'} alignItems={'center'}  >
                                <Box>

                                </Box>
                                <Box >
                                    <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Cargando...</Typography>
                                    <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                                    <InputLabel id="demo-simple-label">Vista previa del certificado</InputLabel>
                                    <object onLoad={() => setLoadDoc(false)} data={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${docRec}`} type="application/pdf" width="60%" height="200px">
                                        <p>No se puede previsualizar</p>
                                    </object>

                                </Box>
                                <Button startIcon={<DeleteForeverIcon />} color='error' onClick={handleReplaceFileRec}>
                                    Quitar
                                </Button>
                            </Box>


                        )} */}

                        {previewUrlR && (
                            <Box>

                                <Box display={'flex'} justifyContent={'space-evenly'}>
                                    <Typography fontSize={20}>Documento:</Typography>
                                    {selectedFileR?.name}
                                    <Tooltip title="Ver documento">

                                        <IconButton target='_blank' href={previewUrlR} >
                                            <RemoveRedEye />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Quitar documento"><IconButton color='error' onClick={handleReplaceFileRec}>
                                        <DeleteForeverIcon />
                                    </IconButton></Tooltip>


                                    <br />
                                    {/* <img src={previewUrl} alt="Vista previa del archivo" /> */}
                                </Box>
                            </Box>


                        )}
                        <input
                            ref={fileInputRefRec}
                            type="file"

                            accept='.pdf'
                            style={{ display: 'none' }}
                            onChange={handleFileChangeR}
                        />
                        <Button variant="outlined" startIcon={<UploadFileOutlined />} onClick={() => fileInputRefRec.current?.click()} disabled={previewUrlR ? true : false}>
                            Subir Certificado
                        </Button>

                    </Box>


                </Modal>



            </Box>
        </Box>

    );
};

export default Step4;