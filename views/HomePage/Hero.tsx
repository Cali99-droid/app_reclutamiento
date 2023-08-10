import { AuthContext } from "@/context";
import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import Image from "next/image";
import { useContext } from "react";
import Atropos from 'atropos/react';

export const Hero = () => {
    const matches = useMediaQuery('(min-width:600px)');
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Box display={"flex"} gap={matches ? 20 : 10} flexDirection={matches ? 'row' : 'column'} padding={5} justifyContent={'center'} alignItems={'center'}>

            <Box >
                <Typography variant='h1' component='h1' fontSize={matches ? 50 : 40} color={'#000'} fontWeight={'bold'} >Nuestra Visión</Typography>

                <Typography textAlign={'start'} mt={2} color={'#454555'} >Ser una institución con pasión para educar, integrada, ética y humana que desarrolla competencias para la vida.</Typography>
                <Box display={'flex'} gap={4}>

                    {isLoggedIn ? (
                        <>
                            <Button href="/postulant" size={matches ? 'large' : 'medium'} sx={{ mt: 5 }} endIcon={<ArrowRight />}>
                                ACTUALIZAR MI FICHA
                            </Button>
                            <Button color="inherit" size={matches ? 'large' : 'medium'} sx={{ mt: 5 }} endIcon={<ArrowRight />} href="/postulant/ficha">
                                VER MI FICHA

                            </Button>
                        </>
                    ) : (
                        <>

                            <Button size={matches ? 'large' : 'medium'} sx={{ mt: 5 }} endIcon={<ArrowRight />} href="/auth/register">
                                REGISTRARME

                            </Button>
                        </>
                    )}

                </Box>
            </Box>
            <Box >
                <Atropos shadow={false} >

                    <Image priority src={"/img/hero-image.svg"} alt={"Hero imagen personas negociando"} width={matches ? 500 : 400} height={matches ? 600 : 200} />

                </Atropos>
            </Box>

        </Box>
    )
}
