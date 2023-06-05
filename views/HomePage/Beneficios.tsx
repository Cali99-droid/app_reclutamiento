import { Box, Chip, Divider, Link, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import SquareIcon from '@mui/icons-material/Square';

import Image from 'next/image';

export const Beneficios = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box className='fadeIn' mt={10}>
            <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={matches ? 'start' : 'center'} mb={2}>
                <SquareIcon color="secondary" fontSize="large" />
                <Typography variant='h2' component='h2' fontWeight={'bold'} fontSize={40} color={'#000'} > BENEFICIOS </Typography>
            </Box>

            <Box display={'flex'} gap={matches ? 10 : 5} paddingLeft={4} paddingRight={4} alignItems={'center'} flexDirection={matches ? 'row' : 'column'}>
                <Box display={matches ? 'block' : 'none'}>
                    <Image src={"/img/b1.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>
                <Box>
                    <Typography fontWeight={900} fontSize={matches ? 50 : 40} color={'#000'}>
                        Ingreso a planilla con beneficios de ley
                    </Typography>
                    <Typography variant="body1" color={'#767687'} >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', fontWeight: 'bold' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>
                </Box>
                <Box display={matches ? 'none' : 'block'}>
                    <Image src={"/img/b1.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>

            </Box>

            <Box display={'flex'} flexDirection={matches ? 'row' : 'column'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>

                <Box>
                    <Typography fontWeight={900} fontSize={matches ? 50 : 40} color={'#000'}>
                        Linea de carrera y escala salarial
                    </Typography>
                    <Typography variant="body1" color={'#767687'} >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', color: '#0045AA' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>
                </Box>
                <Box >
                    <Image src={"/img/b2.svg"} alt={" Linea de carrera y escala salarial"} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>

            </Box>

            <Box display={'flex'} flexDirection={matches ? 'row' : 'column'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>
                <Box display={matches ? 'block' : 'none'}>
                    <Image src={"/img/b3.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>

                <Box>
                    <Typography fontWeight={900} fontSize={matches ? 50 : 40} color={'#000'}>
                        Premios y reconocimeintos
                    </Typography>
                    <Typography variant="body1" color={'#767687'} >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem <Link sx={{ cursor: 'pointer', color: '#0045AA', fontWeight: 'bold' }}>porro incidunt vero</Link > .adipisicing elit. Blanditiis, amet distinctio architecto dolorem possimus iusto maxime nulla, quis exercitationem porro incidunt vero.
                    </Typography>

                    <Divider />

                </Box>
                <Box display={matches ? 'none' : 'block'}>
                    <Image src={"/img/b3.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>
                <Box textAlign={'end'} mt={2} mb={2}>
                    <Chip
                        label="Ver mas beneficios"
                        color="secondary"
                        clickable

                    />
                </Box>
            </Box>


        </Box>
    )
}
