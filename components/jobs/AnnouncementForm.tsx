import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import PublishIcon from '@mui/icons-material/Publish';

const inputProps = {
    accept:"image/png,image/jpeg"
  };
export const AnnouncementForm = () => {
  return (
    <>
        <Grid container spacing={4} marginTop={'.1rem'} justifyContent={'end'}>
            
            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Título"
                                    variant="outlined"
                                    fullWidth  
                                    required  
                                />
            </Grid>
            <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-helper-label">Requisito</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                            
                                    label="Requisito"
                                    
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Bachiller</MenuItem>
                                    <MenuItem value={20}>Titulado</MenuItem>
                                    <MenuItem value={30}>Doctor</MenuItem>
                                    </Select>
                                    <FormHelperText>Requisito minimo para postular</FormHelperText>
                    </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
                            <TextField
                                    id="outlined-multiline-flexible"
                                    label="Descripcion"
                                    multiline
                                    fullWidth
                                    required
                                    
                                />
                                
            </Grid>
            <Grid item xs={12} md={3}>
                                <TextField
                                    label="Numero de vacantes"
                                    variant="outlined"
                                    type="number"
                                    fullWidth    
                                    defaultValue={1} 
                                />
            </Grid>
            <Grid item xs={12} md={3}>
                        <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-helper-label">Especialidad</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                            
                                    label="Especialidad"
                                    
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Biologia</MenuItem>
                                        <MenuItem value={20}>Ingenieria Civil</MenuItem>
                                        <MenuItem value={30}>Matemática</MenuItem>
                                    </Select>
                                    <FormHelperText>Especialidad para postular</FormHelperText>
                    </FormControl>
            </Grid>


            <Grid item xs={12} md={12} mt={3}>
            <Typography>Imagen</Typography>
                        <TextField
                            label="Imagen"
                            margin="dense"
                            variant="standard"
                            type="file"
                            fullWidth   
                            inputProps={inputProps}
                                    
                        />
            </Grid>


        </Grid>
        <Box sx={{display:'flex',  justifyContent:'center'}}>
                <Button  size="large" sx={{marginTop:3, width:'40%', textAlign:'end'}}startIcon={<PublishIcon/>}>Publicar</Button>
        </Box>
    
    
    
    
    </>
  )
}
