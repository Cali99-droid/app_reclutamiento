
import { DatosContext } from '@/context';
import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, styled, tableCellClasses, SelectChangeEvent, LinearProgress, useMediaQuery, Divider } from '@mui/material';
import { useContext, ChangeEvent, useEffect } from 'react';
import Modal from '../modal/Modal';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

import { Edit, UploadFile, UploadFileOutlined } from '@mui/icons-material';
import { useRef } from 'react';
import { reclutApi } from '@/apies';
import { useRouter } from 'next/router';
const Step2 = () => {
    const router = useRouter()
    const { data }: any = useSession();
    // ** console.log(data?.user.persona.postulante[0].id);

    const IdPos = data?.user.persona.postulante[0].id;
    const { setEstudios, estudios, agregarEstudio, editarEstudio, quitarEstudio } = useContext(DatosContext)
    const [open, setOpen] = useState(false)
    // useEffect(() => {
    //     setEstudios()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])

    const [error, setError] = useState(false)
    const [id, setId] = useState<number | null>()
    const [profesion, setProfesion] = useState('')
    const [institucion, setInstitucion] = useState('')
    const [grado, setGrado] = useState('')
    const [year, setyear] = useState(new Date().getFullYear().toString())
    const onProfesionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setProfesion(event.target.value);

    }
    const onInstitucionChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setInstitucion(event.target.value);

    }
    const onGradoChange = (event: SelectChangeEvent<string>) => {
        setGrado(event.target.value);

    }
    const onYearChange = (event: ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length <= 0 || event.target.value.length > 4) {
            setError(true)
        }


        setyear(event.target.value);

    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setError(false)
        setProfesion('')
        setInstitucion('')
        setGrado('')
        setyear('')
        setDoc(null)
        setId(null)
        setEstudios()
    }
    const [doc, setDoc] = useState<string | null>(null);
    const [loadDoc, setLoadDoc] = useState(false)
    const handleConfirm = () => {


        if (profesion.length === 0 || institucion.length === 0 || grado.length === 0 || year.length <= 0) {
            toast.warning('Complete correctamente  todos los campos')
            setError(true)
            return
        };
        if (year.toString().length !== 4) {
            toast.warning('Ingrese un año válido')
            setError(true)
            return
        }

        if (id) {
            editarEstudio(id, profesion, institucion, grado, year, IdPos, doc)
            toast.success('Actualizado con éxito')
        } else {
            agregarEstudio(profesion, institucion, grado, year, IdPos, doc)
            toast.success('Agregado con éxito')
        }

        setProfesion('')
        setInstitucion('')
        setGrado('')
        setError(false)
        handleClose()
    }
    const handleDelete = (id: number) => {
        toast.info('Eliminado Registro ...')
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

    function handleEdit(id: number, profesion: string, institucion: string, grado: string, year: string, doc: any): void {

        handleOpen();
        setId(id)
        setProfesion(profesion)
        setInstitucion(institucion)
        setGrado(grado)
        setyear(year)
        setDoc(doc)
    }
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);

    const onFilesSelected = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        toast.info('Subiendo Documento')

        if (!target.files || target.files.length === 0) {

            return;

        }
        setLoadDoc(true)
        // const selectedFile = target.files[0];

        // setFile(selectedFile);
        // if (selectedFile) {
        //     const fileReader = new FileReader();
        //     fileReader.onload = () => {
        //         setDoc(fileReader.result as string);
        //     };
        //     fileReader.readAsDataURL(selectedFile);
        // } else {
        //     setDoc(null);
        // }
        try {


            const { data } = await reclutApi.post<{ message: string, url: string }>('/postulants/docupload', {
                name: target.files[0].name,
                type: target.files[0].type
            });

            const url = data.url;
            const res = await reclutApi.put(url, target.files[0], {
                headers: {
                    "Content-type": target.files[0].type,
                    "Access-Control-Allow-Origin": "*"
                }
            })

            setDoc(data.message);



        } catch (error) {
            console.log({ error });
        }


    }
    const handleReplaceFile = () => {
        setFile(null);
        setDoc(null);
    };
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box padding={matches ? 4 : 0} className="fadeIn">
            <Box bgcolor={'#FFF'} padding={2} borderRadius={2} >
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mb={2} flexDirection={matches ? 'row' : 'column'}
                >

                    <Box mb={2} >
                        <Typography fontWeight={'bold'}>ESTUDIOS / PROFESIONES</Typography>

                    </Box>
                    <Button fullWidth={!matches} onClick={handleOpen} startIcon={<AddIcon />} color='primary'>Agregar</Button>
                </Box>

                <Divider />

                {
                    estudios.length === 0 ? (
                        <Typography textAlign={'center'} mt={5}>No hay estudios</Typography>

                    ) : (
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
                                            <TableCell component="th" scope="row">{e.profesion}</TableCell>
                                            <TableCell align="right">{e.institucion}</TableCell>
                                            <TableCell align="right">{e.grado}</TableCell>
                                            <TableCell align="right">{e.year}</TableCell>
                                            <TableCell align="right">

                                                <IconButton onClick={() => handleEdit(e.id, e.profesion, e.institucion, e.grado, e.year, e.doc)} >
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


            </Box>


            <Modal title={'AGREGAR ESTUDIO / PROFESION'} open={open} handleClose={handleClose} handleConfirm={handleConfirm}>
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
                        multiline
                        id="profesion"
                        label="Profesión"
                        required
                        placeholder='Nueva profesión'
                        variant="outlined"
                        error={error && profesion.length <= 0}
                        value={profesion}
                        onChange={onProfesionChange}

                        helperText={'* Ingrese una profesión o campo de estudio'}
                    />
                    <TextField
                        id="institucion"
                        label="Institución"
                        variant="outlined"
                        required
                        error={error && institucion.length <= 0}
                        value={institucion}
                        onChange={onInstitucionChange}
                        helperText={'* Ingrese la institución de estudios'}
                    />
                    <Box width={'96%'} marginLeft={1}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Grado</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={grado}
                                label="Grado"
                                onChange={(e) => onGradoChange(e)}
                                error={error && grado.length <= 0}
                            >
                                <MenuItem value={'Estudiante'}>Estudiante</MenuItem>
                                <MenuItem value={'Practicante'}>Practicante</MenuItem>
                                <MenuItem value={'Egresado'}>Egresado</MenuItem>
                                <MenuItem value={'Bachiller'}>Bachiller</MenuItem>
                                <MenuItem value={'Titulado'}>Titulado</MenuItem>
                                <MenuItem value={'Maestria'}>Maestria</MenuItem>
                                <MenuItem value={'Doctorado'}>Doctorado</MenuItem>
                            </Select>
                        </FormControl>
                        <FormHelperText>* Grado que alcanzó</FormHelperText>
                    </Box>

                    <TextField
                        type='number'
                        id="outlined-basic"
                        label="Ingrese año"
                        placeholder="Ingrese año"
                        variant="outlined"
                        value={year}
                        error={error && year.length <= 0 || year.length > 4}
                        required
                        onChange={onYearChange}
                        helperText='*año en el que se graduo'
                        inputProps={{
                            max: 3000,
                            min: 1950
                        }}

                    />

                    <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>
                    {doc && (
                        <Box display={'flex'} alignItems={'center'}  >
                            <Box >
                                <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Cargando...</Typography>
                                <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                                <InputLabel id="demo-simple-label">Vista previa del certificado</InputLabel>
                                <object onLoad={() => setLoadDoc(false)} data={`${process.env.NEXT_PUBLIC_URL_DOCS_BUCKET}${doc}`} type="application/pdf" width="60%" height="200px">
                                    <p>No se puede previsualizar</p>
                                </object>

                            </Box>
                            <Button startIcon={<DeleteForeverIcon />} color='error' onClick={handleReplaceFile}>
                                Quitar
                            </Button>
                        </Box>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"

                        accept='.pdf'
                        style={{ display: 'none' }}
                        onChange={onFilesSelected}
                    />
                    <Button variant="outlined" startIcon={<UploadFileOutlined />} onClick={() => fileInputRef.current?.click()} disabled={doc ? true : false}>
                        Subir Certificado
                    </Button>


                </Box>


            </Modal>



        </Box>
    );
};

export default Step2;