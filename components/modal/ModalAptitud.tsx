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

export const ModalAptitud: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm }) => {
    const { criterios, calcularTotal } = useContext(PostContext);
    const [tot, setTot] = useState(calcularTotal)

    useEffect(() => {
        criterios.set('item1', 0)
        criterios.set('item2', 0)
        criterios.set('item3', 0)
        criterios.set('item4', 0)
        criterios.set('item5', 0)
        criterios.set('item6', 0)
        criterios.set('item7', 0)
        criterios.set('item8', 0)
        criterios.set('item9', 0)
        criterios.set('item10', 0)
    }, [criterios])




    const handlePresentacionChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item1', newValue)

        setTot(calcularTotal)

    };
    const handlePlanificacionChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item2', newValue)
        setTot(calcularTotal)
    };
    const handleDominioChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item3', newValue)
        setTot(calcularTotal)
    };
    const handleManejoChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item4', newValue)
        setTot(calcularTotal)
    };
    const handleUtilizaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item5', newValue)
        setTot(calcularTotal)
    };
    const handleEstimulaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item6', newValue)
        setTot(calcularTotal)
    };
    const handleEscenarioChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item7', newValue)
        setTot(calcularTotal)
    };
    const handleRespuestaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item8', newValue)
        setTot(calcularTotal)
    };
    const handlePresChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item9', newValue)
        setTot(calcularTotal)
    };
    const handleHerramientasChange = (event: Event, newValue: number | number[]) => {

        criterios.set('item10', newValue)
        setTot(calcularTotal)
    };
    const handleCloseTotal = () => {
        handleClose();
        setTot(0)
    }
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll='body'>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Box sx={matches ? { width: 500 } : { width: 250 }}>
                    <Box display={'flex'} justifyContent={'end'} mb={3} alignItems={'center'} gap={2}>
                        <Typography variant='subtitle1'>Puntaje Total: </Typography>
                        <Typography variant='body1' fontWeight={'bold'}> {tot}</Typography>
                    </Box>

                    <Grid container spacing={2} alignItems="center" >

                        <Grid item xs={12}>
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    1. Item 1
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

                        <Grid item xs={12}>
                            <Box mb={3}>
                                <Typography id="input-slider" gutterBottom>
                                    2. Item 2
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
                                    3. item 3
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
                                    4. Item 4
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
                                    5. Item 5
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
                                    6. Item 6
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
                                    7. Item 7
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
                                    8. Item 8
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
                                    9. Item 9
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
                                    10. Item 10
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
                    <Box display={'flex'} justifyContent={'end'} mb={3} alignItems={'center'} gap={2}>
                        <Typography variant='subtitle1'>Puntaje Total: </Typography>
                        <Typography variant='body1' fontWeight={'bold'}> {tot}</Typography>
                    </Box>
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

export default ModalAptitud;
