import { FC, useContext } from 'react';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { IPostulant } from '@/interfaces';
import { PostulantCard } from './PostulantsCard';
import { red } from '@mui/material/colors';
import { PostContext } from '@/context';



interface Props {
   postulants:IPostulant[]
}

export const PostulantsList :FC<Props>= ({postulants}) => {

    let postulantsSort = postulants.sort((x, y) => x.puntaje_in - y.puntaje_in).reverse();
    const {activeStep} = useContext(PostContext)

  return (
    <Grid container spacing={4} marginTop={'.1rem'} >
        {
          
          postulantsSort.length < 1
          ?
          <Box padding={5} width={'100%'}  textAlign={'center'}>

              {
               activeStep===0?(
                <Typography color={red[600]}> Aun no se registran postulantes</Typography>
               )
               :
               (
                <Typography color={red[600]}>No hay postulantes en esta fase, vuelva a la fase anterior y seleccione un postulante</Typography>
               )
              }
            
          </Box>
          :postulantsSort.map((postulant, index)=>(
                <PostulantCard key={postulant.id} postulant={postulant} index={index}/>
            ))
        }    
    </Grid>
  )
}
