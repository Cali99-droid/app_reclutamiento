import { ArrowRight } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery } from "@mui/material"
import Image from "next/image";


export const Hero = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <Box display={"flex"} gap={matches ? 20 : 10} flexDirection={matches ? 'row' : 'column'} padding={5} justifyContent={'center'} alignItems={'center'}>
            <Box  >
                <Typography variant='h1' component='h1' fontSize={matches ? 90 : 60} color={'#000'} fontWeight={'bold'} >Trabaja con nosotros</Typography>
                <Typography textAlign={'start'} mt={2} color={'#454555'} >Lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis, lorem ipsum dolor sit amet consectetur adipisicing elit. In voluptas reprehenderit possimus odit reiciendis</Typography>
                <Box display={'flex'} gap={4}>
                    <Button size={matches ? 'large' : 'medium'} sx={{ mt: 5 }} endIcon={<ArrowRight />}>
                        CONOCER MAS

                    </Button>
                    <Button color="inherit" size={matches ? 'large' : 'medium'} sx={{ mt: 5 }} endIcon={<ArrowRight />} href="/auth/register">
                        REGISTRARME

                    </Button>
                </Box>

            </Box>
            <Box >
                <Image src={"/img/hero-image.svg"} alt={"imagen trabajo"} width={matches ? 500 : 400} height={matches ? 600 : 200} />
            </Box>
        </Box>
    )
}
