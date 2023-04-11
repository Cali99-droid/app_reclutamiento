import { FC } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import { IPostulant } from '@/interfaces';
import { PostulantCard } from './PostulantsCard';



interface Props {
   postulants:IPostulant[]
}

export const PostulantsList :FC<Props>= ({postulants}) => {

    let postulantsSort = postulants.sort((x, y) => x.puntaje_in - y.puntaje_in).reverse();
  return (
    <Grid container spacing={4} marginTop={'.1rem'} >
        {
          
          postulantsSort.length < 1
          ?
          <Box padding={5} width={'100%'}  textAlign={'center'}>
              <Typography >No hay postulantes en esta fase</Typography>
          </Box>
          :postulantsSort.map((postulant, index)=>(
                <PostulantCard key={postulant.id} postulant={postulant} index={index}/>
            ))
        }    
    </Grid>
  )
}
