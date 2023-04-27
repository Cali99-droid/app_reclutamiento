
import { Box, Button, Chip, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';

const Step2 = () => {
    return (
        <Box >

            <Grid container spacing={4}  >

                <Grid item xs={12} md={4}>
                    <TextField
                        label="Experiencia"
                        type="number"
                        variant="outlined"
                        fullWidth
                    // {...register('experiencia', {
                    //     required: 'Este campo es requerido',

                    // })}
                    // error={!!errors.experiencia}
                    // helperText={errors.experiencia?.message}
                    />
                    <FormHelperText>Especificar años de experiencia</FormHelperText>
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Especialidad Principal"
                        variant="outlined"
                        fullWidth
                    // {...register('especialidad', {
                    //     required: 'Este campo es requerido',

                    // })}
                    // error={!!errors.especialidad}
                    // helperText={errors.especialidad?.message}
                    />
                    <FormHelperText>Especificar su especialidad para este puesto</FormHelperText>
                </Grid>

                <Grid item xs={12} md={4}>
                    <TextField
                        label="Sueldo Pretendido"
                        type="number"
                        variant="outlined"
                        fullWidth
                    // {...register('sueldoPretendido', {
                    //     required: 'Este campo es requerido',

                    // })}
                    // error={!!errors.sueldoPretendido}
                    // helperText={errors.sueldoPretendido?.message}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <FormControl fullWidth >
                        <InputLabel id="gradoId">Grado</InputLabel>
                        <Select
                            labelId="gradoId"
                            id="gradoId"
                            label="Requisito"
                        // defaultValue={postulante.gradoId || ''}
                        // {...register('gradoId', {
                        // required: 'Este campo es requerido',

                        // })}
                        // error={!!errors.gradoId}

                        >
                            <MenuItem value={''}></MenuItem>
                            <MenuItem value={1}>Ejemplo</MenuItem>


                            {/* {
                    grados.map(grado => (
                        <MenuItem key={grado.id} value={grado.id}>{grado.nombre.toLocaleUpperCase()}</MenuItem>
                    ))
                    } */}




                        </Select>
                        <FormHelperText>Grado mínimo para postular</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Step2;