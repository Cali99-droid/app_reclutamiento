import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React from 'react'
import SaveIcon from '@mui/icons-material/Save';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
const inputProps = {
    accept:"image/png,image/jpeg"
  };


type FormData = {
    titulo    : string;
    grado    : string;
    descripcion    : string;
    modalidad   : string;
    vacantes: number;
    jornada: string;
    img: string;
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
                                <FormHelperText>Ejem: Docente primaria, Docente Secundaria, etc</FormHelperText>
            </Grid>
            <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-helper-label">Grado</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                            
                                    label="Requisito"
                                    
                                    >
                                        <MenuItem value="">
                                            <em>Ninguno</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Todos</MenuItem>
                                        <MenuItem value={1}>Estudiante</MenuItem>
                                        <MenuItem value={2}>Practicante</MenuItem>
                                        <MenuItem value={3}>Bachiller</MenuItem>
                                        <MenuItem value={4}>Titulado</MenuItem>
                                        <MenuItem value={5}>Doctor</MenuItem>
                                    </Select>
                                    <FormHelperText>Grado mínimo para postular</FormHelperText>
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
                                 <FormHelperText>Ejem: Docente de matemática con 2 años de experiencia...</FormHelperText> 
            </Grid>
          
            <Grid item xs={12} md={3}>
                    <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-helper-label">Modalidad</InputLabel>
                            <Select
                            labelId="demo-s"
                            id="demo-simplr"
                    
                            label="Modalidad"
                            
                            >
                                <MenuItem value="">
                                    <em>Ninguno</em>
                                </MenuItem>
                                <MenuItem value={1}>Presencial</MenuItem>
                                <MenuItem value={2}>Remoto</MenuItem>
                                <MenuItem value={3}>Híbrido</MenuItem>
                            
                            </Select>
                          
                    </FormControl>
                       
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
            <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-helper-label">Jornada</InputLabel>
                                    <Select
                                    labelId="demo-s"
                                    id="demo-simplr"
                            
                                    label="Jornada"
                                    
                                    >
                                        <MenuItem value="">
                                            <em>Ninguno</em>
                                        </MenuItem>
                                        <MenuItem value={1}>Completa</MenuItem>
                                        <MenuItem value={2}>Parcial</MenuItem>
                                       
                                    </Select>    
                    </FormControl>
            </Grid>

            <Grid item xs={12} md={6} >
          
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
        <Box sx={{display:'flex',  justifyContent:'flex-end', mt:2}}>
                <Box width={'50%'} sx={{display:'flex',  justifyContent:'flex-end',gap:5}}>
                    <Button size="large" sx={{marginTop:3,  textAlign:'end',bgcolor:'#9E002B',}}startIcon={<DoNotDisturbIcon/>}>Cancelar</Button> 
                    <Button  size="large" sx={{marginTop:3,  textAlign:'end'}}startIcon={<SaveIcon/>}>Publicar</Button>
                </Box>
        </Box>
      
    
    
    
    
    </>
  )
}
