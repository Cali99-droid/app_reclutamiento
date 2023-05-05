import { Box, Button, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, tableCellClasses, styled, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useState } from 'react';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';
import { investigacion } from '@prisma/client';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
const Step3 = () => {
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const { investigaciones, setInvestigaciones, cargos, agregarInvestigacion, quitarInvestigacion, agregarCargo, quitarCargo } = useContext(DatosContext);
    useEffect(() => {


        setInvestigaciones();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [error, setError] = useState(false)
    //------------------Modal Investigaciones------------------------------
    const [openInves, setOpenInves] = useState(false)
    const handleOpenInves = () => {
        setOpenInves(true);
    }
    const handleCloseInves = () => {
        setOpenInves(false);
        setError(false)
    }
    const handleConfirmInves = () => {

        if (titulo.length === 0 || year.length === 0 || institucion.length === 0 || IdPos.length === 0) {
            toast.warning('Complete todos los campos')
            return
        };
        agregarInvestigacion(titulo, institucion, year, IdPos)
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
    //.......................Modal Cargos  .............
    const [openCargo, setOpenCargo] = useState(false)
    const handleOpenCargo = () => {
        setOpenCargo(true);
    }
    const handleCloseCargo = () => {
        setOpenCargo(false);
        setError(false)
    }
    const handleConfirmCargo = () => {
        //TODO  referencia max 9

        if (referencia.length === 0 || nivel.length === 0 || cantidad.length === 0 || year.length === 0 || institucion.length === 0 || remuneracion.length === 0 || descripcion.length === 0 || IdPos.length === 0) {
            toast.warning('Complete todos los campos')
            return
        };
        agregarCargo(referencia, nivel, cantidad, year, institucion, remuneracion, descripcion, IdPos)
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



    const onRefChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setReferencia(event.target.value);

    }
    const onNivelChange = (event: SelectChangeEvent<string>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setNivel(event.target.value);

    }
    const onCantidadChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setCantidad(event.target.value);

    }
    const onRemuneracionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setRemuneracion(event.target.value);

    }
    const onDescipcionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
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
    return (
        <Box padding={4} mt={3} className="fadeIn" >

            <Divider />
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2}  >

                    <Typography fontWeight={'bold'}>CARGOS DE RESPONSABILIDAD O DE CONFIANZA DESEMPEÑADOS </Typography>

                    <Button onClick={handleOpenCargo} variant="contained" startIcon={<AddIcon />}>Agregar</Button>


                </Box>
                <TableContainer   >

                    <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Cargo</StyledTableCell>
                                <StyledTableCell align="right">Institución</StyledTableCell>
                                <StyledTableCell align="right">Referencia</StyledTableCell>
                                <StyledTableCell align="right">Nivel</StyledTableCell>
                                <StyledTableCell align="right">Personas a cargo</StyledTableCell>
                                <StyledTableCell align="right">Remuneración</StyledTableCell>
                                <StyledTableCell align="right">Año</StyledTableCell>
                                <StyledTableCell align="right">Acciones</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cargos.map((e) => (
                                <TableRow
                                    key={e.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {e.descripcion}
                                    </TableCell>
                                    <TableCell align="right">{e.institucion}</TableCell>
                                    <TableCell align="right">{e.referencia}</TableCell>
                                    <TableCell align="right">{e.nivel}</TableCell>
                                    <TableCell align="right">{e.cantidadCargo}</TableCell>
                                    <TableCell align="right">{e.remuneracion}</TableCell>
                                    <TableCell align="right">{e.year}</TableCell>
                                    <TableCell align="right">
                                        <IconButton onClick={() => handleDeleteCargo(e.id)} color='error'>
                                            <DeleteForeverIcon />
                                        </IconButton>


                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    cargos.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay cargos</Typography>

                    )
                }
            </Box>
            <Box bgcolor={'#F1F1F1'} padding={2} borderRadius={2} mt={3}>
                <Box display={'flex'} mb={2} justifyContent={'space-between'} alignItems={'center'} >

                    <Typography fontWeight={'bold'}> INVESTIGACIONES, PROYECTOS U OTROS TRABAJOS ACADÉMICOS REALIZADOS COMO EXPERIENCIA </Typography>

                    <Button onClick={handleOpenInves} startIcon={<AddIcon />}>Agregar</Button>


                </Box>

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
                    investigaciones.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay Investigaciones</Typography>

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
                        '& .MuiTextField-root': { m: 1, width: 300 },
                    }}
                    noValidate
                    autoComplete="off"
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

                    />
                    <TextField
                        autoFocus
                        multiline
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
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={error && year.length <= 0}
                        onChange={onYearChange}
                        helperText='*año en el que se realizó la investigación'

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
                <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 350 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoFocus
                        multiline
                        id="descripcion"
                        label="Descripción del cargo"
                        placeholder='Descripción del cargo'
                        variant="outlined"
                        error={error && descripcion.length <= 0}
                        value={descripcion}
                        onChange={onDescipcionChange}

                    />
                    <TextField
                        autoFocus
                        multiline
                        id="institucion"
                        label="institucion"
                        placeholder='Nombre de la institución'
                        variant="outlined"
                        error={error && institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}

                    />
                    <TextField

                        id="referencia"
                        label="Referencia"
                        placeholder='Referencia institucional'
                        type='number'
                        variant="outlined"
                        error={error && referencia.length <= 0}
                        value={referencia}
                        onChange={onRefChange}

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
                            >
                                <MenuItem value={'Inicial'}>Inicial</MenuItem>
                                <MenuItem value={'Primaria'}>Primaria</MenuItem>
                                <MenuItem value={'Secundaria'}>Secundaria</MenuItem>
                                <MenuItem value={'Superior'}>Superior</MenuItem>
                                <MenuItem value={'Ninguno'}>Ninguno</MenuItem>

                            </Select>
                        </FormControl>
                    </Box>
                    <TextField
                        type='number'
                        id="cantidadCargo"
                        label="Cantidad de personas a cargo"
                        variant="outlined"
                        value={cantidad}
                        error={error && cantidad.length <= 0}

                        onChange={onCantidadChange}

                    />
                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Remuneracion"
                        variant="outlined"
                        value={remuneracion}
                        error={error && remuneracion.length <= 0}

                        onChange={onRemuneracionChange}
                        helperText='*cuando ganaste'
                    />

                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={error && year.length <= 0}

                        onChange={onYearChange}
                        helperText='*año en el que laboró'
                    />


                </Box>


            </Modal>




        </Box>
    );
};

export default Step3;