import { FC, PropsWithChildren, useState } from 'react';
import Head from 'next/head';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import { InView } from 'react-intersection-observer';
import { FullScreenLoading } from '../ui';



interface Props extends PropsWithChildren {
    title: string;


}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    const [showLoadingMessage, setShowLoadingMessage] = useState(true);
    const handleIntersection = (inView: boolean) => {
        if (inView) {
            setShowLoadingMessage(false);
        }
    };
    const matches = useMediaQuery('(min-width:600px)');
    return (

        <>
            <Head>
                <title>{`AE | ${title}`}</title>
            </Head>

            {showLoadingMessage && <FullScreenLoading />}  <InView onChange={handleIntersection}>
                <main>


                    <Box display='flex' justifyContent='space-evenly' alignItems='center' flexDirection={matches ? 'row' : 'column'} height={matches ? '100vh' : ''} bgcolor={'#f1F1F1'}>
                        <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'} marginBottom={4}>
                            <Box color={'secondary'} display='flex' alignItems='center' >
                                <NextLink href='/' passHref legacyBehavior>
                                    <Link color={'secondary'} display='flex' alignItems='end'>
                                        <Typography variant='h3' fontWeight={'bold'} >AE </Typography>
                                        <Typography variant='h3' sx={{ ml: 0.5 }} > |Empleos</Typography>
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography variant='h6' sx={{ ml: 0.5 }} >{title}</Typography>
                        </Box>
                        <Box>
                            {children}
                        </Box>


                    </Box>

                </main>
            </InView>
        </>


    )
}


