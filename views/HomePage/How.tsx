import { Box, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import VerticalTabs from './VerticalTabs'

export const How = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box padding={matches ? 10 : 2} bgcolor={'#001A72'} width={'100%'} className='fadeIn'>
            <Typography variant="h2" color={'#FFF'} fontSize={matches ? 50 : 40} textAlign={'center'} fontWeight={'bold'}>¿Cómo Postular?</Typography>
            <Typography color={'#FFF'} textAlign={'center'} > Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem</Typography>
            <Box mt={3} paddingTop={5}>
                <VerticalTabs />
            </Box>

        </Box>
    )
}
