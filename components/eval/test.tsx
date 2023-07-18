import React, { FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, FormControlLabel, RadioGroup, FormLabel, FormControl, FormHelperText, Radio, Slider, Typography, Divider, Grid, Box } from "@mui/material";
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '@/context';
import { prisma } from '@/server/db/client';
import { reclutApi } from '@/apies';


interface ModalProps extends PropsWithChildren {
    title: string;
    open: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    items: any[];
    idPostulante: number
}

export const ModalEval: FC<ModalProps> = ({ title, children, open, handleClose, handleConfirm, items, idPostulante }) => {
    const { criterios, calcularTotal, total } = useContext(PostContext);
    const [itemValues, setItemValues] = useState<{ [itemId: number]: number }>({});
    const [totalSum, setTotalSum] = useState(0);
    const [tot, setTot] = useState(calcularTotal)
    const [itemsRead, setItemsRead,] = useState<any[]>(items[0].item)
    const [idTest, setidTest] = useState(items[0].id)
    const { idPos, idUser } = useContext(PostContext);
    // useEffect(() => {
    //     items.forEach(e => criterios.set(e.descripcion))

    // }, [criterios, items])

    useEffect(() => {
        // Calcular la suma total cada vez que se modifiquen los valores de los ítems
        const sum = Object.values(itemValues).reduce((acc, value) => acc + value, 0);
        setTotalSum(sum);
    }, [itemValues]);

    const handleSliderChange = (itemId: number) => (event: any, value: number | number[]) => {
        setItemValues((prevItemValues) => ({
            ...prevItemValues,
            [itemId]: value as number,
        }));
    };


    const handleCloseTotal = () => {
        handleClose();
        setTot(0)
    }
    const handleConfirmClase = async () => {
        //TODO validar actualizacion o creacion  */





        try {

            const resp = await reclutApi.post('/evaluar', { itemValues, totalSum, idTest, idPos, idUser });
            console.log(resp)
            //   toast.success('🦄 Puntaje asignado correctamente0!'),
            //         handleCloseClase()
            //   limpiarCriterios()

        } catch (error) {

            console.log(error);
            alert('El postulante ya tiene puntaje');
        }

    };
    const handleSubmit = async () => {
        console.log(itemValues)
        // try {
        //   await prisma.item.createMany({
        //     data: Object.entries(itemValues).map(([itemId, value]) => ({
        //       itemId: parseInt(itemId),
        //       value,
        //     })),
        //   });

        //   console.log('Valores guardados en la base de datos.');
        // } catch (error) {
        //   console.error('Error al guardar los valores:', error);
        // }
    };
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" scroll='body'>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <Box sx={matches ? { width: 500 } : { width: 250 }}>
                    <Box display={'flex'} justifyContent={'end'} mb={3} alignItems={'center'} gap={2}>
                        <Typography variant='subtitle1'>Puntaje Total: </Typography>
                        <Typography variant='body1' fontWeight={'bold'}> {totalSum}/{itemsRead.length * 10}</Typography>
                    </Box>
                    <Grid container spacing={2} alignItems="center" >
                        {
                            itemsRead.map((i, index) => (
                                <Grid item xs={12} key={i.id}>
                                    <Box mb={3}>
                                        <Typography id="input-slider" gutterBottom>
                                            {(index + 1) + '. ' + i.descripcion}
                                        </Typography>
                                        <Divider />
                                    </Box>
                                    <Slider
                                        name='ss'
                                        value={itemValues[i.id] || 0}
                                        onChange={handleSliderChange(i.id)}
                                        aria-labelledby="input-slider"
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={0}
                                        max={10}

                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Box display={'flex'} justifyContent={'end'} mb={3} alignItems={'center'} gap={2}>
                        <Typography variant='subtitle1'>Puntaje Total: </Typography>
                        <Typography variant='body1' fontWeight={'bold'}> {totalSum}/{itemsRead.length * 10}</Typography>
                    </Box>
                    {/* <Button variant="contained" onClick={handleConfirmClase}>
                        Guardar
                    </Button> */}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseTotal} color='error' sx={{ textTransform: 'uppercase', mt: 1, mr: 1 }} variant="outlined">
                    Cancelar
                </Button>

                <Button onClick={handleConfirmClase} sx={{ mt: 1, mr: 1, textTransform: 'uppercase' }} variant="outlined">
                    Calificar
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default ModalEval;
