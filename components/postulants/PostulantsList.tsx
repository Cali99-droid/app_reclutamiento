import { FC } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { IPostulant } from '@/interfaces';
import { PostulantCard } from './PostulantsCard';



interface Props {
  postulants: any[]
}

export const PostulantsList: FC<Props> = ({ postulants }) => {

  // let postulantsSort = postulants.sort((x, y) => x.puntaje_in - y.puntaje_in).reverse();
  return (
    <Grid container spacing={4} marginTop={'.1rem'} >
      {

        postulants.length < 1
          ?
          <Box padding={5} width={'100%'} textAlign={'center'}>
            <Typography >No hay postulantes en esta fase, si existe un error contacte con el administrador</Typography>
          </Box>
          : postulants.map((postulant, index) => (
            <PostulantCard key={postulant.postulante.id} postulant={postulant.postulante} index={index} />
          ))
      }
    </Grid>
  )
}
