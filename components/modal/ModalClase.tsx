import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, FormControlLabel, RadioGroup, FormLabel, FormControl, FormHelperText, Radio, Slider, Typography, Divider, Grid, Box } from "@mui/material";
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '@/context';


interface ModalProps extends PropsWithChildren {
    title: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;

}

export const ModalClase: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {
    const { criterios, calcularTotal } = useContext(PostContext);
    const [tot, setTot] = useState(calcularTotal)

    useEffect(() => {
        criterios.set('presentacion', 0)
        criterios.set('planificacion', 0)
        criterios.set('dominio', 0)
        criterios.set('manejo', 0)
        criterios.set('estimula', 0)
        criterios.set('utiliza', 0)
        criterios.set('escenario', 0)
        criterios.set('respuesta', 0)
        criterios.set('pres', 0)
        criterios.set('herramientas', 0)
    }, [criterios])




    const handlePresentacionChange = (event: Event, newValue: number | number[]) => {

        criterios.set('presentacion', newValue)

        setTot(calcularTotal)

    };
    const handlePlanificacionChange = (event: Event, newValue: number | number[]) => {

        criterios.set('planificacion', newValue)
        setTot(calcularTotal)
    };
    const handleDominioChange = (event: Event, newValue: number | number[]) => {

        criterios.set('dominio', newValue)
        setTot(calcularTotal)
    };
    const handleManejoChange = (event: Event, newValue: number | number[]) => {

        criterios.set('manejo', newValue)
        setTot(calcularTotal)
    };
    const handleUtilizaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('utiliza', newValue)
        setTot(calcularTotal)
    };
    const handleEstimulaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('estimula', newValue)
        setTot(calcularTotal)
    };
    const handleEscenarioChange = (event: Event, newValue: number | number[]) => {

        criterios.set('escenario', newValue)
        setTot(calcularTotal)
    };
    const handleRespuestaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('respuesta', newValue)
        setTot(calcularTotal)
    };
    const handlePresChange = (event: Event, newValue: number | number[]) => {

        criterios.set('pres', newValue)
        setTot(calcularTotal)
    };
    const handleHerramientasChange = (event: Event, newValue: number | number[]) => {

        criterios.set('herramientas', newValue)
        setTot(calcularTotal)
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll='body'>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Box sx={{ width: 800 }}>
                    <Box display={'flex'} justifyContent={'end'}>
                        <Typography variant='subtitle1'>Puntaje Total: {tot}</Typography>
                    </Box>

                    <Grid container spacing={2} alignItems="center" >

                        <Grid item xs={12}>
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    1. PRESENTACION
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='ss'
                                defaultValue={0}
                                onChange={handlePresentacionChange}
                                aria-labelledby="input-slider"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    2. PLANIFICACIÓN DE LA SESIÓN DE CLASE
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handlePlanificacionChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    3. DOMINIO DEL TEMA
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleDominioChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    4. MANEJO DE METODOLOGÍA
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleManejoChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    5. ESTIMULA EL PENSAMIENTO CRÍTICO
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleEstimulaChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    6. UTILIZA LA MOTIVACIÓN EN DIFERENTES MOMENTOS
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleUtilizaChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    7. DOMINIO DE ESCENARIO
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleEscenarioChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    8. CAPACIDAD DE RESPUESTA
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleRespuestaChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    9. PRESENTACIÓN DE MATERIALES Y RECURSOS
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handlePresChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    10. DOMINIO DE HERRAMIENTAS (FISICAS O VIRTUALES)
                                </Typography>
                                <Divider />
                            </Box>
                            <Slider
                                name='sss'
                                defaultValue={0}
                                onChange={handleHerramientasChange}
                                aria-labelledby="input-"
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={10}
                            />
                        </Grid>

                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color='error' sx={{ textTransform: 'uppercase', mt: 1, mr: 1 }} variant="outlined">
                    Cancelar
                </Button>

                <Button onClick={handleConfirm} sx={{ mt: 1, mr: 1, textTransform: 'uppercase' }} variant="outlined">
                    Finalizar
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default ModalClase;
