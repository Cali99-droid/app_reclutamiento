import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import React from 'react';
import ConvocatoriaPage from '../../pages/convocatorias/[id]';
import { DatosContext } from '@/context';
import { useContext, ChangeEvent } from 'react';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Modal from '../modal/Modal';
const Step4 = () => {
    const { capacitaciones, agregarCapacitacion, quitarCapacitacion, reconocimientos, agregarReconocimiento, quitarReconocimiento } = useContext(DatosContext)

    //--------------Modal Capacitaciones------------------

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        // //TODO validar campos
        agregarCapacitacion(titulo, horas, year, institucion, descripcion)
        setTitulo('')
        setHoras('')
        setYear('')
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
        setTitulo(event.target.value);

    }
    const onHorasChange = (event: ChangeEvent<HTMLInputElement>) => {
        setHoras(event.target.value);

    }
    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInstitucion(event.target.value);

    }
    const onDescripcionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescripcion(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);

    }

    //------------------reconociemirteos Modal----------------
    const [openRec, setOpenRec] = useState(false)
    const handleOpenRec = () => {
        setOpenRec(true);
    }
    const handleCloseRec = () => {
        setOpenRec(false);
    }
    const handleConfirmRec = () => {
        // //TODO validar campos
        agregarReconocimiento(reconocimiento, year, institucion, descripcion)
        setReconocimiento('')
        setYear('')
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

    return (
        <Box padding={4} mt={3} >
            <Box padding={4} mt={3} bgcolor={'#FFF'}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography>Agregar sus Capacitaciones/Cursos </Typography>

                    <Button onClick={handleOpen}>Agregar</Button>
                </Box>
                <Divider />
                {

                    capacitaciones.map(c => (

                        <Box key={c.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{c.titulo}</Typography>
                            <Typography>{c.institucion}</Typography>
                            <Typography >{c.horas}</Typography>
                            <Typography >{c.year}</Typography>
                            <Typography >{c.descripcion}</Typography>
                            <IconButton onClick={() => handleDelete(c.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
                {
                    capacitaciones.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay capacitaciones</Typography>

                    )
                }



                <Modal title={'Nuevo Capacitación/Curso'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
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
                            id="titulo"
                            label="Titulo"
                            placeholder='Titulo de curso'
                            variant="outlined"
                            error={titulo.length <= 0}
                            value={titulo}
                            onChange={onTituloChange}
                        />
                        <TextField
                            autoFocus

                            id="institucion"
                            label="Institución"
                            placeholder='Intitucion donde llevo el curso'
                            variant="outlined"
                            error={institucion.length <= 0}
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
                            error={horas.length <= 0}
                            value={horas}
                            onChange={onHorasChange}
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
                        <TextField
                            autoFocus
                            multiline
                            id="desc"
                            label="Explique cómo aplicó lo aprendido"
                            placeholder='descripcion'
                            variant="outlined"
                            error={descripcion.length <= 0}
                            value={descripcion}
                            onChange={onDescripcionChange}
                        />

                    </Box>


                </Modal>



            </Box>
            <Box padding={4} mt={3} bgcolor={'#FFF'}>
                <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                    <Typography>Agregar PRINCIPALES RECONOCIMIENTOS, DIPLOMAS, PREMIOS U OTROS RECIBIDOS EN SU VIDA LABORAL, </Typography>

                    <Button onClick={handleOpenRec}>Agregar</Button>
                </Box>
                <Divider />
                {

                    reconocimientos.map(r => (

                        <Box key={r.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                            <Typography >{r.reconocimento}</Typography>
                            <Typography>{r.institucion}</Typography>

                            <Typography >{r.descripcion}</Typography>
                            <IconButton onClick={() => handleDeleteRec(r.id)} color='error'>
                                <DeleteForeverIcon />
                            </IconButton>

                        </Box>


                    ))

                }
                {
                    reconocimientos.length === 0 && (
                        <Typography textAlign={'center'} mt={5}>No hay reconocimientos</Typography>

                    )
                }



                <Modal title={'Nuevo reconocimiento'} open={openRec} handleClose={handleCloseRec} handleConfirm={handleConfirmRec}>
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
                            id="reconocimento"
                            label="Reconocimento"
                            placeholder='Titulo del reconocimento'
                            variant="outlined"
                            error={reconocimiento.length <= 0}
                            value={reconocimiento}
                            onChange={onReconocimientoChange}
                        />
                        <TextField
                            autoFocus

                            id="institucion"
                            label="Institución"
                            placeholder='Intitucion donde llevo el curso'
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

                        />
                        <TextField
                            autoFocus
                            multiline
                            id="desc"
                            label="Descripcion del premio"
                            placeholder='descripcion'
                            variant="outlined"
                            error={descripcion.length <= 0}
                            value={descripcion}
                            onChange={onDescripcionChange}
                        />

                    </Box>


                </Modal>



            </Box>
        </Box>

    );
};

export default Step4;