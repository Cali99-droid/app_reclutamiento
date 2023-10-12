
import { DatosContext } from '@/context';
import { Box, Button, Chip, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, styled, tableCellClasses, SelectChangeEvent, LinearProgress, useMediaQuery, Divider, Tooltip } from '@mui/material';
import { useContext, ChangeEvent, useEffect } from 'react';
import Modal from '../modal/Modal';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';

import { Download, Edit, RemoveRedEye, UploadFile, UploadFileOutlined } from '@mui/icons-material';
import { useRef } from 'react';
import { reclutApi } from '@/apies';
import { useRouter } from 'next/router';
import axios from 'axios';
import Document from '../../pages/_document';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import { domainToASCII } from 'url';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import client from '@/aws3-config';
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
        setPreviewUrl(null);
        setDis(false)
    }
    const [doc, setDoc] = useState<string | null>(null);
    const [loadDoc, setLoadDoc] = useState(false)

    const handleConfirm = async () => {
        setLoadDoc(true);
        const nameDoc = await handleUpload();

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
            editarEstudio(id, profesion, institucion, grado, year, IdPos, nameDoc)
            setLoadDoc(false);
            toast.success('Actualizado con éxito')
        } else {
            agregarEstudio(profesion, institucion, grado, year, IdPos, nameDoc)
            setLoadDoc(false);
            toast.success('Agregado con éxito')
        }

        setProfesion('')
        setInstitucion('')
        setGrado('')
        setError(false)
        setDoc(null);
        setPreviewUrl(null);
        setSelectedFile(null);
        setLoadDoc(false);
        handleClose()
    }
    const handleDelete = (id: number) => {
        toast.info('Eliminado Registro ...')
        quitarEstudio(id)
    }
    const [dis, setDis] = useState(false)
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
        setPreviewUrl(process.env.NEXT_PUBLIC_URL_DOCS_BUCKET + doc)
    }
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [file, setFile] = useState<File | null>(null);
    const [uploadState, setUploadState] = useState({});
    const notificacion = async (error: string) => {
        try {
            const { data } = await reclutApi.post('/noti', { error });

            return {
                hasError: false
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }


        }
    }
    const [documen, setDocumen] = useState<any>();
    const [selectedFile, setSelectedFile] = useState<any>();
    const [previewUrl, setPreviewUrl] = useState<string | null>();
    const handleFileChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const file = target.files?.[0];

        if (file) {
            setSelectedFile(file);

            // Crear una URL de objeto para previsualizar el archivo
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };
    const handleUpload = async () => {
        if (!selectedFile) {
            //   alert("Selecciona un archivo antes de subirlo.");
            return;
        }
        setDis(true)
        try {
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append("name", selectedFile.name);
            formData.append("type", selectedFile.type);

            const { data } = await reclutApi.post("/postulants/docupload/load", formData);
            console.log(data.message);
            setSelectedFile(null);
            setDis(false)
            return data.message;

            //   if (response.ok) {
            //     alert("Archivo subido exitosamente a S3.");
            //   } else {
            //     alert("Error al subir el archivo a S3.");
            //   }
        } catch (error) {
            setDis(false)
            notificacion('error al subir foto en doc step 2')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
            setLoadDoc(false);
            console.error("Error al subir el archivo:", error);
        }
    };

    const submitDoc = async ({ target }: ChangeEvent<HTMLInputElement>) => {
        if (!target.files || target.files.length === 0) {

            return;

        }

        let doc = target.files[0];
        setLoadDoc(true)
        setDocumen(target.files[0]);

        console.log(documen)
        toast.info('Subiendo Documento')
        reclutApi.post("/postulants/docupload/load", {
            name: target.files[0].name,
            type: target.files[0].type
        }).then((res) => {
            const signedRequest = res.data.signedRequest;
            const url = res.data.url;
            console.log(doc)
            setUploadState({
                ...uploadState,
                url,
            });

            // Perform the actual upload using the signed URL
            // const options = {
            //     headers: {
            //         "Content-type": fileType,
            //         "Access-Control-Allow-Origin": "*"
            //     }
            // };
            console.log(documen)
            reclutApi.put(signedRequest, doc, {
                headers: {
                    "Content-type": documen.type,
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then((_) => {
                    setUploadState({ ...uploadState, success: true });
                    toast.success("Documento Subido Corretamente");
                    setLoadDoc(false)
                    // setValue('image', res.data.url, { shouldValidate: true });
                    setDoc(res.data.name);

                })
                .catch((_) => {
                    setLoadDoc(false)
                    notificacion('error al subir foto en dni')
                    toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                });
        })
            .catch((error) => {
                notificacion('error al subir foto')
                toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
                setLoadDoc(false)
            });
    }
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
            toast.success('Documento Subido Corretamente')
            setDoc(data.message);



        } catch (error) {
            setLoadDoc(false)
            notificacion('error al subir documento step 1')
            toast.error("Hubo un error, por favor intentelo de nuevo en unos minutos");
            console.log({ error });
        }


    }
    const handleReplaceFile = () => {
        setFile(null);
        setDoc(null);
        setPreviewUrl(null);
        setSelectedFile(null);
    };
    const download = async (filename: string) => {
        const dir = filename
        const command = new GetObjectCommand({
            Bucket: "caebucket",
            Key: "hello-s3.txt"
        });

        try {
            const response = await client.send(command);
            // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
            if (response.Body) {
                const str = await response.Body.transformToString();
                console.log(str);
            } else {
                console.log('nada')
            }


        } catch (err) {
            console.error(err);
        }
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


            <Modal title={'AGREGAR ESTUDIO / PROFESION'} open={open} handleClose={handleClose} handleConfirm={handleConfirm} dis={dis}>
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

                    <Typography sx={{ display: loadDoc ? 'block' : 'none' }} >Guardando...</Typography>
                    <LinearProgress sx={{ display: loadDoc ? 'block' : 'none' }} />
                    {previewUrl && (
                        <Box>

                            <Box display={'flex'} justifyContent={'space-evenly'}>
                                <Typography fontSize={20}>Documento:</Typography>
                                {selectedFile?.name}
                                <Tooltip title="Ver documento">

                                    <IconButton target='_blank' href={previewUrl} >
                                        <RemoveRedEye />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Quitar documento"><IconButton color='error' onClick={handleReplaceFile}>
                                    <DeleteForeverIcon />
                                </IconButton></Tooltip>


                                <br />
                                {/* <img src={previewUrl} alt="Vista previa del archivo" /> */}
                            </Box>
                        </Box>


                    )}

                    <input
                        ref={fileInputRef}
                        type="file"

                        accept='.pdf'
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                    <Button variant="outlined" startIcon={<UploadFileOutlined />} onClick={() => fileInputRef.current?.click()} disabled={previewUrl ? true : false}>
                        Seleccionar Documento
                    </Button>
                    <FormHelperText>* Subir su certificado es opcional, solo se le pedirá en caso sea seleccionado</FormHelperText>

                </Box>


            </Modal>



        </Box>
    );
};

export default Step2;