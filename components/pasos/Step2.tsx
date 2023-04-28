
import { DatosContext } from '@/context';
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider, IconButton } from '@mui/material';
import { useContext, ChangeEvent } from 'react';
import Modal from '../modal/Modal';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Step2 = () => {


    const { estudios, agregarEstudio, quitarEstudio } = useContext(DatosContext)
    const [open, setOpen] = useState(false)

    const [profesion, setProfesion] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [grado, setGrado] = useState('')
    const [year, setyear] = useState(new Date().getFullYear().toString())
    const onProfesionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setProfesion(event.target.value);

    }
    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInstitucion(event.target.value);

    }
    const onGradoChange = (event: ChangeEvent<HTMLInputElement>) => {
        setGrado(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {
        setyear(event.target.value);

    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleConfirm = () => {
        //TODO validar campos
        agregarEstudio(profesion, institucion, grado, year)
        setProfesion('')
        setInstitucion('')
        setGrado('')

        handleClose()
    }
    const handleDelete = (id: number) => {
        quitarEstudio(id)
    }

    return (
        <Box padding={4} mt={3} bgcolor={'#FFF'}>
            <Box display={'flex'} justifyContent={'space-between'} mb={1}>
                <Typography>Agregar sus Estudios/Profesiones </Typography>

                <Button onClick={handleOpen}>Agregar</Button>
            </Box>
            <Divider />
            {

                estudios.map(estudio => (

                    <Box key={estudio.id} display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
                        <Typography >{estudio.profesion}</Typography>
                        <Typography>{estudio.institucion}</Typography>
                        <Typography >{estudio.grado}</Typography>
                        <Typography >{estudio.year}</Typography>
                        <IconButton onClick={() => handleDelete(estudio.id)} color='error'>
                            <DeleteForeverIcon />
                        </IconButton>

                    </Box>


                ))

            }
            {
                estudios.length === 0 && (
                    <Typography textAlign={'center'} mt={5}>No hay estudios</Typography>

                )
            }



            <Modal title={'Nueva Profesión'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
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
                        id="profesion"
                        label="Profesion"
                        placeholder='Nueva profesión'
                        variant="outlined"
                        error={profesion.length <= 0}
                        value={profesion}
                        onChange={onProfesionChange}
                    />
                    <TextField
                        id="institucion"
                        label="Institución"
                        variant="outlined"
                        error={institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Grado"
                        variant="outlined"
                        error={grado.length <= 0}
                        value={grado}
                        onChange={onGradoChange}
                    />
                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Año"
                        variant="outlined"
                        value={year}
                        error={year.length <= 0}

                        onChange={onYearChange}
                        helperText='*año en el que se graduo'
                    />

                </Box>


            </Modal>



        </Box>
    );
};

export default Step2;