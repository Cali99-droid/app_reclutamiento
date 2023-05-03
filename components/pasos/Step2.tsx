
import { DatosContext } from '@/context';
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography, Divider, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, styled, tableCellClasses, SelectChangeEvent } from '@mui/material';
import { useContext, ChangeEvent, useEffect } from 'react';
import Modal from '../modal/Modal';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
const Step2 = () => {

    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);
    const IdPos = data?.user.persona.postulante[0].id;
    const { setEstudios, estudios, agregarEstudio, quitarEstudio } = useContext(DatosContext)
    const [open, setOpen] = useState(false)
    // useEffect(() => {
    //     setEstudios()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
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
    const onGradoChange = (event: SelectChangeEvent<string>) => {
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
        <Box padding={4} mt={3} bgcolor={'#FFF'}>

            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} bgcolor={'#F1F1F1'} mb={2} padding={1} borderRadius={2}>
                <Typography>ESTUDIOS / PROFESIONES </Typography>
                <IconButton onClick={handleOpen} aria-label="delete" color='secondary'>
                    <AddCircleIcon fontSize='medium' />
                </IconButton>
                {/* <Button startIcon={<AddCircleIcon />}></Button> */}
            </Box>
            <TableContainer   >

                <Table sx={{ minWidth: 650 }} aria-label="simple table" >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Profesión</StyledTableCell>
                            <StyledTableCell align="right">Institución</StyledTableCell>
                            <StyledTableCell align="right">Grado</StyledTableCell>
                            <StyledTableCell align="right">Año</StyledTableCell>
                            <StyledTableCell align="right">Acciones</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {estudios.map((e) => (
                            <TableRow
                                key={e.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {e.profesion}
                                </TableCell>
                                <TableCell align="right">{e.institucion}</TableCell>
                                <TableCell align="right">{e.grado}</TableCell>
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
                estudios.length === 0 && (
                    <Typography textAlign={'center'} mt={5}>No hay estudios</Typography>

                )
            }



            <Modal title={'Nueva Profesión'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
                <Box display={'flex'} width={400} flexDirection={'column'} gap={2} mt={2}
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, },
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
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Grado</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={grado}
                            label="Grado"
                            onChange={(e) => onGradoChange(e)}
                        >
                            <MenuItem value={'Estudiante'}>Estudiante</MenuItem>
                            <MenuItem value={'Practicante'}>Practicante</MenuItem>
                            <MenuItem value={'Bachiller'}>Bachiller</MenuItem>
                            <MenuItem value={'Titulado'}>Titulado</MenuItem>
                            <MenuItem value={'Maestria'}>Maestria</MenuItem>
                            <MenuItem value={'Doctorado'}>Doctorado</MenuItem>
                        </Select>
                    </FormControl>

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