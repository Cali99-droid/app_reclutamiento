import { Box, Button, Divider, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, tableCellClasses, styled, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useState } from 'react';
import Modal from '../modal/Modal';
import { useSession } from 'next-auth/react';

import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { validations } from '@/helpers';
import { Edit } from '@mui/icons-material';

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
            editarCargo(idCargo, referencia, contacto, nivel, cantidad, year, institucion, remuneracion, descripcion, IdPos)
            toast.success('Actualizado con éxito')
        } else {
            agregarCargo(referencia, contacto, nivel, cantidad, year, institucion, remuneracion, descripcion, IdPos)
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
    function handleEdit(id: number, descripcion: string, institucion: string, referencia: string, contacto: string, nivel: string, cantidadCargo: string, remuneracion: string, year: string): void {
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

    }



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
                                        <IconButton onClick={() => handleEdit(e.id, e.descripcion, e.institucion, e.referencia, e.contacto, e.nivel, e.cantidadCargo, e.remuneracion, e.year)} >
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
                        required

                    />
                    <TextField
                        autoFocus
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
                <Box display={'flex'} flexDirection={'column'} gap={.5} mt={1}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: 350 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField


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
                        autoFocus

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


                </Box>


            </Modal>




        </Box>
    );
};

export default Step3;