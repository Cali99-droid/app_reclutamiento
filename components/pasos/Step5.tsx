import { Box, Button, Divider, FormControl, FormHelperText, FormLabel, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, styled, tableCellClasses } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../modal';
import { useState, useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useSession } from 'next-auth/react';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { reclutApi } from '@/api';
import FileUploadIcon from '@mui/icons-material/FileUpload';



const Step5 = () => {

    // ? En caso exista problemas usar 
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;

    const { doc, docu, aficiones, tecnologias, agregarAficion, quitarAficion, agregarTic, quitarTic, setTic, subirDoc } = useContext(DatosContext);
    useEffect(() => {
        setTic()
        doc();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [error, setError] = useState(false)
    console.log(docu)
    //--------------Modal Aficiones------------------

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setError(false)
    }
    const handleConfirm = () => {

        if (actividad.length === 0 || nivel.length === 0 || logro.length === 0 || year.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        agregarAficion(actividad, year, nivel, logro, IdPos)
        setActividad('')

        setNivel('')
        setLogro('')

        handleClose()
    }
    const handleDelete = (id: number) => {
        quitarAficion(id)
    }

    //--------------------Aficiones---------------------
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

    //--------------Modal TICS------------------

    const [openTics, setOpenTics] = useState(false)
    const handleOpenTics = () => {
        setOpenTics(true);
    }
    const handleCloseTics = () => {
        setOpenTics(false);
        setError(false)
    }
    const handleConfirmTics = () => {

        if (tecnologia.length === 0 || nivel.length === 0 || IdPos.length === 0) {
            toast.warning('¡Complete los campos requeridos!')
            setError(true)
            return
        };
        agregarTic(tecnologia, nivel, IdPos)
        setTecnologia('')
        setNivel('')


        handleCloseTics()
    }
    const handleDeleteTics = (id: number) => {
        quitarTic(id)
    }


    //-----------------TICS-.----------------
    const [tecnologia, setTecnologia] = useState('')
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

    const handleFin = async () => {
        if (!file) {
            return;
        }
        try {

            // console.log( file );

            const formData = new FormData();
            formData.append('file', file);
            const { data } = await reclutApi.post<{ message: string }>('/postulants/docUpload', formData);
            // setDoc(data.message);
            subirDoc(data.message, IdPos);
            console.log(data)



        } catch (error) {
            console.log({ error });
        }
    }

    const handleReplaceFile = () => {
        setFile(null);
        setPreviewUrl(null);
    };


    return (
        <Box padding={4} mt={3} className="fadeIn">
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography fontWeight={'bold'}> USO DE  TECNOLOGÍAS </Typography>

                    <Button onClick={handleOpenTics} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />
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
                                        <IconButton onClick={() => handleDeleteTics(e.id)} color='error'>
                                            <DeleteForeverIcon />
                                        </IconButton>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {
                    tecnologias.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay Tecnologias</Typography>

                    )
                }



                <Modal title={'Nuevo uso de Tecnologias'} open={openTics} handleClose={handleCloseTics} handleConfirm={handleConfirmTics}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: 300 },
                        }}
                        noValidate
                        autoComplete="off"
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
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography fontWeight={'bold'} >OTRAS ACTIVIDADES, AFICIONES O HABILIDADES APRENDIDAS Y/O ESTUDIADAS </Typography>

                    <Button onClick={handleOpen} startIcon={<AddIcon />}>Agregar</Button>
                </Box>
                <Divider />
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
                    aficiones.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay aficiones</Typography>

                    )
                }



                <Modal title={'NUEVA ACTIVIDAD, AFICION O HABILIDAD APRENDIDA Y/O ESTUDIADA'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
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
                        <Box width={'98%'} marginLeft={1}>
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
                            autoFocus
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
                            error={error && year.length <= 0}
                            required
                            onChange={onYearChange}
                            helperText='*año en el que culminó el curso'
                        />

                    </Box>


                </Modal>



            </Box>
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} mt={3}>
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
            </Box>

        </Box >
    );
};

export default Step5;