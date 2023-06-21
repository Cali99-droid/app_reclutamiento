import { Box, Button, Divider, FormHelperText, IconButton, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import React, { useRef } from 'react';
import { DatosContext } from '@/context';
import { useContext, ChangeEvent } from 'react';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { Edit, UploadFileOutlined } from '@mui/icons-material';
import { reclutApi } from '@/apies';
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
    }
    const [doc, setDoc] = useState<string | null>(null);
    const handleConfirm = () => {
        if (titulo.length === 0 || horas.length === 0 || year.length === 0 || institucion.length === 0 || descripcion.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }
        if (idCapacitacion) {
            editarCapacitacion(idCapacitacion, titulo, horas, year, institucion, descripcion, IdPos, doc)
            toast.success('Actualizado con éxito')
        } else {
            agregarCapacitacion(titulo, horas, year, institucion, descripcion, IdPos, doc)
            toast.success('Agregado con éxito')
        }

        setTitulo('')
        setHoras('')

        setInstitucion('')
        setDescripcion('')

        handleClose()
    }
    const handleDelete = (id: number) => {
        quitarCapacitacion(id)
    }


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
    }
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        const selectedFile = target.files[0];


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

            console.log(data.message)


            setDoc(data.message);

            console.log(data)


        } catch (error) {
            console.log({ error });
        }


    }
    const handleReplaceFile = () => {
        setFile(null);
        setDoc(null);
    };

    //------------------reconociemirteos Modal----------------
    const [openRec, setOpenRec] = useState(false)
    const [idRec, setIdRec] = useState<null | number>()
    const handleOpenRec = () => {
        setOpenRec(true);
    }
    const handleCloseRec = () => {
        setOpenRec(false);
        setError(false)
    }
    const handleConfirmRec = () => {

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

        if (idRec) {
            editarReconocimiento(idRec, reconocimiento, year, institucion, descripcion, IdPos)
            toast.success('Actualizado con éxito')
        } else {
            agregarReconocimiento(reconocimiento, year, institucion, descripcion, IdPos)
            toast.success('Agregado con éxito')
        }

        setReconocimiento('')

        setInstitucion('')
        setDescripcion('')

        handleCloseRec()
    }
    const handleDeleteRec = (id: number) => {
        quitarReconocimiento(id)
    }

    const [reconocimiento, setReconocimiento] = useState('')

    const onReconocimientoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReconocimiento(event.target.value);

    }

    function handleEditReconocimiento(id: number, reconocimiento: string, institucion: string, descripcion: string, year: string): void {
        handleOpenRec()
        setIdRec(id);
        setReconocimiento(reconocimiento)
        setInstitucion(institucion)
        setDescripcion(descripcion);
        setYear(year)

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



    return (
        <Box padding={4} mt={3} className="fadeIn">
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography fontWeight={'bold'} textTransform={'uppercase'}>Capacitaciones/Cursos </Typography>

                    <Button onClick={handleOpen} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />
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

                {
                    capacitaciones.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay capacitaciones</Typography>

                    )
                }



                <Modal title={'Nuevo Capacitación/Curso'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 400 },
                        }}
                        noValidate
                        autoComplete="off"
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
                            autoFocus
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
                            autoFocus
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
                            autoFocus
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
                        <InputLabel id="demo-simple-select-label">Certificado</InputLabel>
                        <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>
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
                        {doc && (
                            <Box display={'flex'} alignItems={'center'} gap={4} padding={1}>
                                <Box >
                                    <h3>Vista Previa</h3>
                                    <object data={`https://plataforma-virtual.s3.us-west-2.amazonaws.com/docs/${doc}`} type="application/pdf" width="60%" height="200px">
                                        <p>No se puede previsualizar</p>
                                    </object>

                                </Box>
                                <Button startIcon={<DeleteForeverIcon />} color='error' onClick={handleReplaceFile}>
                                    Quitar
                                </Button>
                            </Box>
                        )}
                    </Box>


                </Modal>



            </Box>
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography fontWeight={'bold'}> PRINCIPALES RECONOCIMIENTOS, DIPLOMAS, PREMIOS U OTROS RECIBIDOS EN SU VIDA LABORAL</Typography>

                    <Button onClick={handleOpenRec} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />

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
                                        <IconButton onClick={() => handleEditReconocimiento(e.id, e.reconocimento, e.institucion, e.descripcion, e.year)} >
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

                {
                    reconocimientos.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay reconocimientos</Typography>

                    )
                }



                <Modal title={'Nuevo Reconocimiento'} open={openRec} handleClose={handleCloseRec} handleConfirm={handleConfirmRec}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 400 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
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
                            autoFocus
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
                            autoFocus
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

                    </Box>


                </Modal>



            </Box>
        </Box>

    );
};

export default Step4;