import { Box, Link, Paper, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import React from 'react'


export const Dudas = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <>
            <Typography variant="h2" color={'#000'} fontSize={50} textAlign={'center'} fontWeight={'bold'}>¿Tienes dudas?</Typography>
            <Typography textAlign={'center'} fontSize={20} paddingTop={3}>Ponte en contacto con nosotros mediante nuestros canales de atención</Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={matches ? 'space-evenly' : 'center'} alignItems={'center'} padding={10} gap={1}>
                <Paper elevation={2} sx={{ padding: 3 }}>
                    <Link sx={{ cursor: 'pointer' }}>
                        <Image src={"/img/whatsapp-icon.svg"} alt={""} width={matches ? 150 : 50} height={matches ? 150 : 50} />
                    </Link>

                </Paper>
                <Paper elevation={2} sx={{ padding: 3 }}>
                    <Link sx={{ cursor: 'pointer' }}>
                        <Image src={"/img/facebook.svg"} alt={""} width={matches ? 150 : 50} height={matches ? 150 : 50} />
                    </Link>
                </Paper>
                <Paper elevation={2} sx={{ padding: 3 }}>
                    <Link sx={{ cursor: 'pointer' }}>
                        <Image src={"/img/google-gmail.svg"} alt={""} width={matches ? 150 : 50} height={matches ? 150 : 50} />
                    </Link>
                </Paper>
            </Box>
        </>
    )
}
