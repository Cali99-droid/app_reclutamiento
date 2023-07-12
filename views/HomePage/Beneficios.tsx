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
                <Typography variant='h2' component='h2' fontWeight={'bold'} fontSize={30} color={'#000'} > BENEFICIOS </Typography>
            </Box>

            <Box display={'flex'} gap={matches ? 10 : 5} paddingLeft={4} paddingRight={4} alignItems={'center'} flexDirection={matches ? 'row' : 'column'}>
                <Box display={matches ? 'block' : 'none'}>
                    <Image src={"/img/b1.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>
                <Box>
                    <Typography fontWeight={900} fontSize={matches ? 30 : 20} color={'#000'}>
                        Ingreso a planilla con beneficios de ley
                    </Typography>
                    <Typography variant="body1" color={'#767687'} textAlign={'left'} mb={2} mt={2}>
                        El Colegio Particular Albert Einstein, ubicado en la hermosa ciudad de Huaraz, se enorgullece de cumplir con todas las normativas laborales al celebrar contratos a tiempo completo. Nos comprometemos a brindar a nuestro valioso personal los beneficios de ley correspondientes, como el pago de CTS en los meses de mayo y noviembre, el aguinaldo en julio y diciembre, así como unas merecidas vacaciones remuneradas. En el Colegio Albert Einstein, valoramos a nuestros empleados y nos aseguramos de que reciban todos los derechos y beneficios que les corresponden.

                    </Typography>
                </Box>
                <Box display={matches ? 'none' : 'block'}>
                    <Image src={"/img/b1.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>

            </Box>

            <Box display={'flex'} flexDirection={matches ? 'row' : 'column'} gap={10} paddingLeft={4} paddingRight={4} alignItems={'center'}>

                <Box>
                    <Typography fontWeight={900} fontSize={matches ? 30 : 20} color={'#000'}>
                        Linea de carrera y escala salarial
                    </Typography >
                    <Typography variant="body1" color={'#767687'} textAlign={'left'} mb={2} mt={2}>
                        El Colegio Albert Einstein, líder educativo en la ciudad de Huaraz y en el Callejón de Huaylas, reconoce y valora tanto los años de experiencia como los logros alcanzados por nuestros profesores y personal administrativo. Para fomentar el crecimiento profesional, hemos implementado una sólida escala salarial que respalda una línea de carrera claramente definida. Esta escala valora el esfuerzo y el aprendizaje continuo, proporcionando un entorno motivador donde nunca dejamos de aprender.
                    </Typography >

                    <Typography variant="body1" textAlign={'left'} >
                        Si tu verdadera pasión es la educación, no hay lugar mejor para ti que el Colegio Albert Einstein. Únete a nuestro equipo y forma parte de un ambiente inspirador y en constante evolución, donde valoramos y apoyamos tu crecimiento profesional.

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
                    <Typography fontWeight={900} fontSize={matches ? 30 : 20} color={'#000'}>
                        Premios y reconocimeintos
                    </Typography>
                    <Typography variant="body1" color={'#767687'} textAlign={'left'} mb={2} mt={2}>
                        En el Colegio Albert Einstein, reconocemos y valoramos tu dedicación y responsabilidad en el cumplimiento de todas las actividades inherentes a tu cargo, así como en aquellas programadas en nuestro calendario académico. Tu desempeño es cuidadosamente evaluado y calificado, lo que te brinda la oportunidad de recibir premios y reconocimientos que contribuyen a tu crecimiento profesional.

                    </Typography>
                    <Typography variant="body1" textAlign={'left'} mb={2} mt={2}>
                        Valoramos el compromiso y la excelencia en cada tarea que desempeñas. Ya sea participando en actividades extracurriculares, liderando proyectos educativos o colaborando en eventos especiales, tu dedicación y contribución no pasan desapercibidas. Estos logros y reconocimientos suman en tu crecimiento profesional.
                    </Typography>
                    <Typography variant="body1" color={'#767687'} textAlign={'left'} mb={2} mt={2}>
                        En el Colegio Albert Einstein, creemos en el reconocimiento del esfuerzo y el talento de nuestro equipo. Únete a nosotros y sé parte de una comunidad donde tus logros son apreciados y recompensados, brindándote un impulso adicional en tu camino hacia el éxito. En el Colegio Albert Einstein, creemos en el reconocimiento del esfuerzo y el talento de nuestro equipo. Únete a nosotros y sé parte de una comunidad donde tus logros son apreciados y recompensados, brindándote un impulso adicional en tu camino hacia el éxito.
                    </Typography>

                    <Divider />

                </Box>
                <Box display={matches ? 'none' : 'block'}>
                    <Image src={"/img/b3.svg"} alt={""} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Box>

            </Box>


        </Box>
    )
}
