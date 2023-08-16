import { FC, PropsWithChildren, useState } from 'react';
import Head from 'next/head';
import { Box, Grid, Link, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';
import { InView } from 'react-intersection-observer';
import { FullScreenLoading } from '../ui';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;

}

export const AuthLayout: FC<Props> = ({ children, title, pageDescription }) => {
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
                <meta name="description" content={pageDescription} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />
            </Head>

            {showLoadingMessage && <FullScreenLoading />}  <InView onChange={handleIntersection}>
                <main>

                    <ToastContainer />
                    <Grid container direction="row"
                        justifyContent="center"
                        alignItems="center" bgcolor={'#f1F1F1'} height={matches ? '100vh' : ''} spacing={0}>
                        <Grid item xs={12} sm={4} padding={5} >
                            <Box color={'secondary'} display='flex' alignItems='center' justifyContent={'center'}>
                                <NextLink href='/' passHref legacyBehavior>
                                    <Link color={'secondary'} display='flex' alignItems='end'>
                                        <Typography variant='h3' fontWeight={'bold'} >AE </Typography>
                                        <Typography variant='h3' sx={{ ml: 0.5 }} > |Empleos</Typography>
                                    </Link>
                                </NextLink>

                            </Box>
                            <Typography textAlign={'center'} variant='h6' sx={{ ml: 0.5 }} >{title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            {children}
                        </Grid>


                    </Grid>

                </main>
            </InView>
        </>


    )
}


