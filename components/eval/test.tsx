import React, { ChangeEvent, FC, PropsWithChildren } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery, FormControlLabel, RadioGroup, FormLabel, FormControl, FormHelperText, Radio, Slider, Typography, Divider, Grid, Box, Alert, TextareaAutosize, TextField } from "@mui/material";
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '@/context';
import { prisma } from '@/server/db/client';
import { reclutApi } from '@/apies';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';


interface ModalProps extends PropsWithChildren {
    title: string;
    open: boolean;
    handleClose: () => void;
    // handleConfirm: () => void;
    items: any[];

}

export const ModalEval: FC<ModalProps> = ({ title, children, open, handleClose, items }) => {
    const { criterios, calcularTotal, total } = useContext(PostContext);
    let it: any = [];
    let idTes: any;
    if (items[0]) {
        it = items[0].item;
        idTes = items[0].id;
    }
    const router = useRouter();
    const { id } = router.query;

    const [itemValues, setItemValues] = useState<{ [itemId: number]: number }>({});
    const [totalSum, setTotalSum] = useState(0);
    const [tot, setTot] = useState(calcularTotal)

    const [itemsRead, setItemsRead,] = useState<any[]>(it)
    const [idTest, setidTest] = useState(idTes)
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
        console.log(idPos)
        try {

            const resp = await reclutApi.post('/evaluar', { itemValues, totalSum, idTest, idPos, idUser, id, comentario });
            // console.log(resp)
            toast.success('🦄 Puntaje asignado correctamente0!'),
                //         handleCloseClase()
                //   limpiarCriterios()
                handleClose();
        } catch (error) {

            console.log(error);
            alert('Hubo un error');
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
    const [comentario, setComentario] = useState('')
    const [error, setError] = useState(false)
    const onComentarioChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length <= 0) {
            setError(true)
        }
        setComentario(event.target.value);

    }
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
                            itemsRead.length > 0 ? (
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
                            ) : (
                                <Grid item xs={12} >
                                    <Alert severity='warning'>No existe una evaluación asignada, contacte con el administrador </Alert>
                                </Grid>

                            )
                        }

                    </Grid>
                    <Box display={'flex'} justifyContent={'end'} mb={3} alignItems={'center'} gap={2}>
                        <Typography variant='subtitle1'>Puntaje Total: </Typography>
                        <Typography variant='body1' fontWeight={'bold'}> {totalSum}/{itemsRead.length * 10}</Typography>
                    </Box>
                    <Box>
                        <TextField
                            id="comentario"
                            label="Comentario"
                            multiline
                            rows={2}
                            value={comentario}
                            error={error && comentario.length <= 0}
                            onChange={onComentarioChange}
                            fullWidth={true}
                            // {...register('descripcion', {
                            //     required: 'Este campo es requerido',
                            //     minLength: { value: 8, message: 'Mínimo 8 caracteres' }
                            // })}
                            // error={!!errors.descripcion}
                            helperText={'Opcional'}
                        />


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

                <Button disabled={itemsRead.length <= 0} onClick={handleConfirmClase} sx={{ mt: 1, mr: 1, textTransform: 'uppercase' }} variant="outlined">
                    Calificar
                </Button>
            </DialogActions>

        </Dialog>
    );
};

export default ModalEval;
