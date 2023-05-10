import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';
import { Box, Link, Typography } from '@mui/material';
import NextLink from 'next/link';



interface Props extends PropsWithChildren {
    title: string;


}

export const AuthLayout: FC<Props> = ({ children, title }) => {
    return (

        <>
            <Head>
                <title>{`AE | ${title}`}</title>
            </Head>


            <main>

                <Box display='flex' justifyContent='center' flexDirection={'column'} alignItems='center' height="calc(100vh - 200px)" >
                    <Box display={'flex'} flexDirection={'column'} gap={4} alignItems={'center'} marginBottom={4}>
                        <Box color={'secondary'} display='flex' alignItems='center' >
                            <NextLink href='/' passHref legacyBehavior>
                                <Link color={'secondary'} display='flex' alignItems='end'>
                                    <Typography variant='h3' fontWeight={'bold'} >AE  </Typography>
                                    <Typography variant='h3' sx={{ ml: 0.5 }} > |Empleos</Typography>
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography variant='h6' sx={{ ml: 0.5 }} >{title}</Typography>
                    </Box>
                    {children}
                </Box>
            </main>

        </>


    )
}


