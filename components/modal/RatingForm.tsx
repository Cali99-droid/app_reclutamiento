import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import { useState, useContext, useEffect } from 'react';
import { PostContext } from '@/context';
import { Divider, useMediaQuery } from '@mui/material';



export default function RatingFrom() {
    const { criterios, calcularTotal } = useContext(PostContext);
    const [tot, setTot] = useState(calcularTotal)

    useEffect(() => {
        criterios.set('presentacion', 0)
        criterios.set('tacto', 0)
        criterios.set('alegria', 0)
        criterios.set('equilibrio', 0)
        criterios.set('confianza', 0)
    }, [criterios])


    const handlePresentChange = (event: Event, newValue: number | number[]) => {

        criterios.set('presentacion', newValue)

        setTot(calcularTotal)

    };
    const handleTactoChange = (event: Event, newValue: number | number[]) => {

        criterios.set('tacto', newValue)
        setTot(calcularTotal)
    };
    const handleAlegriaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('alegria', newValue)
        setTot(calcularTotal)
    };
    const handleEquilibrioChange = (event: Event, newValue: number | number[]) => {

        criterios.set('equilibrio', newValue)
        setTot(calcularTotal)
    };
    const handleConfianzaChange = (event: Event, newValue: number | number[]) => {

        criterios.set('confianza', newValue)
        setTot(calcularTotal)
    };


    const matches = useMediaQuery('(min-width:600px)');


    return (
        <Box sx={matches ? { width: 500 } : { width: 250 }}>
            <Box display={'flex'} justifyContent={'end'}>
                <Typography variant='subtitle1'>Puntaje Total: {tot}</Typography>
            </Box>

            <Grid container spacing={2} alignItems="center" >

                <Grid item xs={12}>
                    <Box mb={3}>
                        <Typography id="input-slider" gutterBottom>
                            1. Presentacion
                        </Typography>
                        <Divider />
                    </Box>
                    <Slider
                        name='ss'
                        defaultValue={0}
                        onChange={handlePresentChange}
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
                            2. Tacto y diplomacia
                        </Typography>
                        <Divider />
                    </Box>
                    <Slider
                        name='sss'
                        defaultValue={0}
                        onChange={handleTactoChange}
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
                            3. Optimismo y alegría
                        </Typography>
                        <Divider />
                    </Box>
                    <Slider
                        name='sss'
                        defaultValue={0}
                        onChange={handleAlegriaChange}
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
                            4. Equilibrio personal
                        </Typography>
                        <Divider />
                    </Box>
                    <Slider
                        name='sss'
                        defaultValue={0}
                        onChange={handleEquilibrioChange}
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
                            5. Confianza en sí mismo
                        </Typography>
                        <Divider />
                    </Box>
                    <Slider
                        name='sss'
                        defaultValue={0}
                        onChange={handleConfianzaChange}
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
    );
}