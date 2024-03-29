import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../modal';
import { useState, useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useSession } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

import { Edit } from '@mui/icons-material';



const Step5 = () => {

    // ? En caso exista problemas usar 
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;

    const { doc, docu, aficiones, tecnologias, agregarAficion, editarAficion, quitarAficion, agregarTic, editarTic, quitarTic, setTic, subirDoc } = useContext(DatosContext);
    useEffect(() => {
        setTic()
        doc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [error, setError] = useState(false)

    //--------------Modal Aficiones------------------

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setError(false)
        setIdAct(null);
        setActividad('');
        setNivel('');
        setLogro('');
        setYear('');
    }
    const handleConfirm = () => {

        if (actividad.length === 0 || nivel.length === 0 || logro.length === 0 || year.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }
        if (idAct) {
            editarAficion(idAct, actividad, year, nivel, logro, IdPos)
            toast.success('Actualizado con éxito')
        } else {
            agregarAficion(actividad, year, nivel, logro, IdPos)
            toast.success('Agregado con éxito')
        }

        handleClose()
    }
    const handleDelete = (id: number) => {
        toast.info('Eliminado Registro ...')
        quitarAficion(id)
    }

    //--------------------Aficiones---------------------
    const [idAct, setIdAct] = useState<null | number>()
    const [actividad, setActividad] = useState('')
    const [nivel, setNivel] = useState('')
    const [logro, setLogro] = useState('')
    const [year, setYear] = useState(new Date().getFullYear().toString())

    const onActividadChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setActividad(event.target.value);

    }
    const onNivelChange = (event: SelectChangeEvent<string>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setNivel(event.target.value);
        setError(false)

    }
    const onLogroChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setLogro(event.target.value);

    }

    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setYear(event.target.value);

    }
    function handleEditActividad(id: number, actividad: string, nivel: string, logro: string, year: string): void {
        handleOpen()
        setIdAct(id);
        setActividad(actividad);
        setNivel(nivel);
        setLogro(logro);
        setYear(year);
    }


    //--------------Modal TICS------------------

    const [openTics, setOpenTics] = useState(false)
    const handleOpenTics = () => {
        setOpenTics(true);
    }
    const handleCloseTics = () => {
        setOpenTics(false);
        setError(false)
        setIdTic(null)
        setTecnologia('')
        setNivel('')
    }
    const handleConfirmTics = () => {

        if (tecnologia.length === 0 || nivel.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        if (idTic) {
            editarTic(idTic, tecnologia, nivel, IdPos)
            toast.success('Actualizado con éxito')
        } else {

            agregarTic(tecnologia, nivel, IdPos)
            toast.success('Agregado con éxito')
        }
        setTecnologia('')
        setNivel('')


        handleCloseTics()
    }
    function handleEditTic(id: number, tics: string, nivel: string) {
        handleOpenTics();
        setIdTic(id)
        setTecnologia(tics)
        setNivel(nivel)
    }
    const handleDeleteTics = (id: number) => {
        toast.info('Eliminado Registro ...')
        quitarTic(id)
    }


    //-----------------TICS-.----------------
    const [tecnologia, setTecnologia] = useState('')
    const [idTic, setIdTic] = useState<null | number>()
    const onTecnologiaChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setTecnologia(event.target.value);

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

    //y documentos

    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(docu.doc);

    // const [doc, setDoc] = useState('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {
            return;
        }
        const selectedFile = target.files?.[0];
        setFile(selectedFile);
        if (selectedFile) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result as string);
            };
            fileReader.readAsDataURL(selectedFile);
        } else {
            setPreviewUrl(null);
        }


    }


    const matches = useMediaQuery('(min-width:600px)');

    return (
        <Box padding={matches ? 4 : 0} mt={3} className="fadeIn">
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} >
                        <Typography fontWeight={'bold'} > USO DE  TECNOLOGÍAS </Typography>
                    </Box>
                    <Button onClick={handleOpenTics} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />


                {
                    tecnologias.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay Tecnologias</Typography>

                    ) : (
                        <TableContainer   >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>

                                        <StyledTableCell >Tecnologia</StyledTableCell>
                                        <StyledTableCell align="right">Nivel</StyledTableCell>

                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tecnologias.map((e) => (
                                        <TableRow
                                            key={e.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {e.tecnologia}
                                            </TableCell>
                                            <TableCell align="right">{e.nivel}</TableCell>

                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditTic(e.id, e.tecnologia, e.nivel)} >
                                                    <Edit />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteTics(e.id)} color='error'>
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



                <Modal title={'Nuevo uso de Tecnologias'} open={openTics} handleClose={handleCloseTics} handleConfirm={handleConfirmTics}>
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
                            required
                            multiline
                            id="tecnologia"
                            label="Tecnologia"
                            placeholder='Tecnologia'
                            variant="outlined"
                            error={error && tecnologia.length <= 0}
                            value={tecnologia}
                            onChange={onTecnologiaChange}
                        />
                        <Box width={'96%'} marginLeft={1}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={nivel}
                                    label="Nivel"
                                    onChange={(e) => onNivelChange(e)}
                                >
                                    <MenuItem value={'Basico'}>Básico</MenuItem>
                                    <MenuItem value={'Intermedio'}>Intermedio</MenuItem>
                                    <MenuItem value={'Avanzado'}>Avanzado</MenuItem>


                                </Select>
                            </FormControl>
                        </Box>


                    </Box>


                </Modal>



            </Box>
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1} flexDirection={matches ? 'row' : 'column'}>
                    <Box mb={2} >
                        <Typography fontWeight={'bold'} >OTRAS ACTIVIDADES, AFICIONES O HABILIDADES APRENDIDAS Y/O ESTUDIADAS </Typography>
                    </Box>
                    <Button onClick={handleOpen} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />


                {
                    aficiones.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay aficiones</Typography>

                    ) : (
                        <TableContainer   >

                            <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>actividad</StyledTableCell>
                                        <StyledTableCell align="right">Nivel</StyledTableCell>
                                        <StyledTableCell align="right">Logro</StyledTableCell>
                                        <StyledTableCell align="right">Año</StyledTableCell>

                                        <StyledTableCell align="right">Acciones</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {aficiones.map((e) => (
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

                                            <TableCell align="right">
                                                <IconButton onClick={() => handleEditActividad(e.id, e.actividad, e.nivel, e.logro, e.year)} >
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



                <Modal title={'Nueva Actividad'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"

                        noValidate
                        autoComplete="on"
                        alignContent={'center'}
                        justifyContent={'center'}
                    >
                        <TextField
                            required
                            autoFocus
                            multiline
                            id="actividad"
                            label="Actividad"
                            placeholder='Actividad'
                            variant="outlined"
                            error={error && actividad.length <= 0}
                            value={actividad}
                            onChange={onActividadChange}
                        />
                        <Box >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Nivel</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={nivel}
                                    label="Nivel"
                                    onChange={(e) => onNivelChange(e)}
                                    error={error && nivel.length <= 0}
                                >
                                    <MenuItem value={'Basico'}>Básico</MenuItem>
                                    <MenuItem value={'Intermedio'}>Intermedio</MenuItem>
                                    <MenuItem value={'Avanzado'}>Avanzado</MenuItem>


                                </Select>
                            </FormControl>
                        </Box>
                        <TextField

                            required
                            id="logro"
                            label="Logro"
                            placeholder='Logro'
                            variant="outlined"
                            error={error && logro.length <= 0}
                            value={logro}
                            onChange={onLogroChange}
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
                        />

                    </Box>


                </Modal>



            </Box>
            {/* <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography fontWeight={'bold'} >Documentos de sustento</Typography>

                    <Box>



                        <input

                            type="file"

                            accept='.pdf'
                            // style={{ display: 'none' }}
                            onChange={onFilesSelected}
                        />
                        <FormHelperText>*En un solo archivo pdf suba sus documentos que sustenten la información brindada</FormHelperText>
                    </Box>
                    <Button onClick={() => handleFin()} startIcon={<FileUploadIcon />}>
                        Subir
                    </Button>
                </Box>
                <a href={docu.doc}>Documento</a>
                {previewUrl && (
                    <Box display={'flex'} alignItems={'center'} justifyContent={'space-evenly'}>
                        <div>


                            <a href={docu}>Documento</a>
                            <object data={previewUrl} type="application/pdf" width="50%" height="200px">
                                <p>Vista porevia no dies</p>
                            </object>
                        </div>
                        <Button onClick={handleReplaceFile} >Quitar</Button>
                    </Box>
                )}




                <Divider />
            </Box> */}


        </Box >
    );
};

export default Step5;