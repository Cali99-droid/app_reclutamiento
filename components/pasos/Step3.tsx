import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useState } from 'react';
import Modal from '../modal/Modal';
const Step3 = () => {
    const { investigaciones, cargos, agregarInvestigacion, quitarInvestigacion, agregarCargo, quitarCargo } = useContext(DatosContext);

    //------------------Modal Investigaciones------------------------------
    const [openInves, setOpenInves] = useState(false)
    const handleOpenInves = () => {
        setOpenInves(true);
    }
    const handleCloseInves = () => {
        setOpenInves(false);
    }
    const handleConfirmInves = () => {
        //TODO validar campos
        agregarInvestigacion(nombre, institucion, year)
        setInstitucion('')
        setNombre('')

        handleCloseInves()

    }
    const handleDelete = (id: number) => {
        quitarInvestigacion(id)
    }
    //-------------------------Investigaciones----------------
    const [nombre, setNombre] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [year, setYear] = useState(new Date().getFullYear().toString())

    const onNombreChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNombre(event.target.value);

    }

    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInstitucion(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);

    }
    //.......................Modal Cargos  .............
    const [openCargo, setOpenCargo] = useState(false)
    const handleOpenCargo = () => {
        setOpenCargo(true);
    }
    const handleCloseCargo = () => {
        setOpenCargo(false);
    }
    const handleConfirmCargo = () => {
        //TODO validar campos
        agregarCargo(referencia, nivel, cantidad, year, institucion, remuneracion)
        setReferencia('')
        setNivel('')
        setCantidad('')
        setRemuneracion('')
        setInstitucion('')
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



    const onRefChange = (event: ChangeEvent<HTMLInputElement>) => {
        setReferencia(event.target.value);

    }
    const onNivelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNivel(event.target.value);

    }
    const onCantidadChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCantidad(event.target.value);

    }
    const onRemuneracionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRemuneracion(event.target.value);

    }


    return (
        <Box padding={4} mt={3} >
            <Box bgcolor={'#FFF'} padding={2}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography> INVESTIGACIONES O PROYECTOS U OTROS TRABAJOS ACADÉMICOS REALIZADOS COMO EXPERIENCIA </Typography>

                    <Button onClick={handleOpenInves}>Agregar</Button>
                </Box>
                <Divider />
                {

                    investigaciones.map(i => (

                        <Box key={i.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{i.nombre}</Typography>
                            <Typography>{i.institucion}</Typography>
                            <Typography >{i.year}</Typography>
                            <IconButton onClick={() => handleDelete(i.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
                {
                    investigaciones.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay Investigaciones</Typography>

                    )
                }

            </Box>
            <Box bgcolor={'#FFF'} padding={2} my={3}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography>CARGOS DE RESPONSABILIDAD O DE CONFIANZA DESEMPEÑADOS </Typography>

                    <Button onClick={handleOpenCargo}>Agregar</Button>
                </Box>
                <Divider />
                {

                    cargos.map(c => (

                        <Box key={c.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{c.institucion}</Typography>
                            <Typography >{c.referencia}</Typography>
                            <Typography>{c.nivel}</Typography>
                            <Typography>{c.cantidadCargo}</Typography>
                            <Typography>{c.remuneracion}</Typography>
                            <Typography >{c.year}</Typography>
                            <IconButton onClick={() => handleDeleteCargo(c.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
                {
                    cargos.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay cargos</Typography>

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
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoFocus
                        multiline
                        id="nombre"
                        label="nombre"
                        placeholder='Nombre de la investigación'
                        variant="outlined"
                        error={nombre.length <= 0}
                        value={nombre}
                        onChange={onNombreChange}

                    />
                    <TextField
                        autoFocus
                        multiline
                        id="institucion"
                        label="institucion"
                        placeholder='Nombre de la institución'
                        variant="outlined"
                        error={institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}

                    />
                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={year.length <= 0}

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
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        autoFocus
                        multiline
                        id="institucion"
                        label="institucion"
                        placeholder='Nombre de la institución'
                        variant="outlined"
                        error={institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}

                    />
                    <TextField

                        id="referencia"
                        label="Referencia"
                        placeholder='Referencia institucional'
                        type='number'
                        variant="outlined"
                        error={referencia.length <= 0}
                        value={referencia}
                        onChange={onRefChange}

                    />
                    <TextField
                        autoFocus
                        multiline
                        id="nivel"
                        label="Nivel"
                        placeholder='Inicial, Primaria, Secundaria....'
                        variant="outlined"
                        error={nivel.length <= 0}
                        value={nivel}
                        onChange={onNivelChange}

                    />
                    <TextField
                        type='number'
                        id="cantidadCargo"
                        label="Cantidad de personas a cargo"
                        variant="outlined"
                        value={cantidad}
                        error={cantidad.length <= 0}

                        onChange={onCantidadChange}

                    />
                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Remuneracion"
                        variant="outlined"
                        value={remuneracion}
                        error={remuneracion.length <= 0}

                        onChange={onRemuneracionChange}
                        helperText='*cuando ganaste'
                    />

                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={year.length <= 0}

                        onChange={onYearChange}
                        helperText='*año en el que laboró'
                    />


                </Box>


            </Modal>




        </Box>
    );
};

export default Step3;