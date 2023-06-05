import { Box, Paper, Typography, useMediaQuery } from '@mui/material'
import React from 'react'

export const Partners = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box width={'100%'} padding={2} textAlign={'center'}>
            <Typography variant='h6' component='h6' color={'#767687'} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Nuestras Instituciones</Typography>
            <Box display={'flex'} flexDirection={matches ? 'row' : 'column'} justifyContent={'space-between'} gap={5} mt={5}>
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography component='p' color={'primary'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Colegio Albert Einstein</Typography>
                </Paper>
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography component='p' color={'secondary'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Academia Encinas</Typography>
                </Paper>
                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography component='p' color={'#ED1C24'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Eistincitos</Typography>
                </Paper>

                <Paper elevation={2} sx={{ padding: 2 }}>
                    <Typography component='p' color={'#767687'} fontSize={18} fontWeight={'bold'} textAlign={'center'} textTransform={'uppercase'} >Otra Institucion</Typography>
                </Paper>
            </Box>

        </Box>
    )
}
