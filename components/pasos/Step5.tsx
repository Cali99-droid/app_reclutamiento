import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Modal } from '../modal';
import { useState, useContext, ChangeEvent } from 'react';
import { DatosContext } from '@/context';
import { useSession } from 'next-auth/react';
import { persona, postulante } from '@prisma/client';


const Step5 = () => {

    // ? En caso exista problemas usar 
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const { aficiones, tecnologias, agregarAficion, quitarAficion, agregarTic, quitarTic, setTic } = useContext(DatosContext);
    useEffect(() => {
        setTic()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //--------------Modal Aficiones------------------

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        // //TODO validar campos
        agregarAficion(actividad, year, nivel, logro)
        setActividad('')
        setYear('')
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
    const [year, setYear] = useState('')

    const onActividadChange = (event: ChangeEvent<HTMLInputElement>) => {
        setActividad(event.target.value);

    }
    const onNivelChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNivel(event.target.value);

    }
    const onLogroChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLogro(event.target.value);

    }

    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);

    }

    //--------------Modal TICS------------------

    const [openTics, setOpenTics] = useState(false)
    const handleOpenTics = () => {
        setOpenTics(true);
    }
    const handleCloseTics = () => {
        setOpenTics(false);
    }
    const handleConfirmTics = () => {
        // //TODO validar campos
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
        setTecnologia(event.target.value);

    }


    return (
        <Box padding={4} mt={3} >
            <Box padding={4} mt={3} bgcolor={'#FFF'}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography>OTRAS ACTIVIDADES, AFICIONES O HABILIDADES APRENDIDAS Y/O ESTUDIADAS </Typography>

                    <Button onClick={handleOpen}>Agregar</Button>
                </Box>
                <Divider />
                {

                    aficiones.map(c => (

                        <Box key={c.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{c.actividad}</Typography>
                            <Typography>{c.nivel}</Typography>
                            <Typography >{c.logro}</Typography>
                            <Typography >{c.year}</Typography>
                            <IconButton onClick={() => handleDelete(c.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
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

                            autoFocus
                            multiline
                            id="actividad"
                            label="Actividad"
                            placeholder='Actividad'
                            variant="outlined"
                            error={actividad.length <= 0}
                            value={actividad}
                            onChange={onActividadChange}
                        />
                        <TextField
                            autoFocus

                            id="nivel"
                            label="nivel"
                            placeholder='nivel'
                            variant="outlined"
                            error={nivel.length <= 0}
                            value={nivel}
                            onChange={onNivelChange}
                        />
                        <TextField
                            autoFocus

                            id="horas"
                            label="Horas"
                            placeholder='Horas'
                            variant="outlined"
                            error={logro.length <= 0}
                            value={logro}
                            onChange={onLogroChange}
                        />
                        <TextField
                            type='number'
                            id="outlined-basic"
                            label="Año"
                            variant="outlined"
                            value={year}
                            error={year.length <= 0}

                            onChange={onYearChange}
                            helperText='*año en el que culminó el curso'
                        />

                    </Box>


                </Modal>



            </Box>
            <Box padding={4} mt={3} bgcolor={'#FFF'}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography>AGREGAR USO DE LAS TECNOLOGÍAS </Typography>

                    <Button onClick={handleOpenTics}>Agregar</Button>
                </Box>
                <Divider />
                {

                    tecnologias.map(r => (

                        <Box key={r.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{r.tecnologia}</Typography>
                            <Typography>{r.nivel}</Typography>


                            <IconButton onClick={() => handleDeleteTics(r.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
                {
                    tecnologias.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay Tecnologias</Typography>

                    )
                }



                <Modal title={'Nuevo reconocimiento'} open={openTics} handleClose={handleCloseTics} handleConfirm={handleConfirmTics}>
                    <Box display={'flex'} flexDirection={'column'} gap={2} mt={2}
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            autoFocus
                            multiline
                            id="tecnologia"
                            label="Tecnologia"
                            placeholder='Tecnologia'
                            variant="outlined"
                            error={tecnologia.length <= 0}
                            value={tecnologia}
                            onChange={onTecnologiaChange}
                        />
                        <TextField
                            autoFocus

                            id="nivel"
                            label="Nivel"
                            placeholder='Nivel de experiencia'
                            variant="outlined"
                            error={nivel.length <= 0}
                            value={nivel}
                            onChange={onNivelChange}
                        />

                    </Box>


                </Modal>



            </Box>
        </Box>
    );
};

export default Step5;