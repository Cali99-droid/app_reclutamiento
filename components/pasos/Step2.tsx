
import { DatosContext } from '@/context';
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider, IconButton } from '@mui/material';
import { useContext, ChangeEvent, useEffect } from 'react';
import Modal from '../modal/Modal';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const Step2 = () => {

    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const { setEstudios, estudios, agregarEstudio, quitarEstudio } = useContext(DatosContext)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setEstudios()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
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
        if (profesion.length === 0 || institucion.length === 0 || grado.length === 0) {
            toast.warning('Complete los campos marcados en rojo')
            return
        };
        agregarEstudio(profesion, institucion, grado, year, IdPos)
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