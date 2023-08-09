// pages/404.tsx
import React from 'react';
import { Button, Container, CssBaseline, Typography, createTheme, Theme, Box } from '@mui/material';

import Link from 'next/link';
import Image from 'next/image';


const NotFoundPage: React.FC = () => {


    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
        }}>
            <Typography variant="h3" component="h1" mb={5}>
                Opps...  404
            </Typography>

            <Image
                src="/img/cae.svg"
                alt="Albert Einstein"
                width={400}
                height={400}
                style={{ marginBottom: 10 }}
            />
            <Typography variant="h5" component="h2">
                Página no encontrada
            </Typography>
            <Typography variant="body1" gutterBottom>
                {` "No todo lo que se puede contar cuenta, y no todo lo que cuenta se puede contar. - Albert Einstein"`}
            </Typography>

            <Typography variant="body2" color="textSecondary" sx={{ marginTop: 3 }}>
                La página que estás buscando no existe.
            </Typography>
            <Link href="/" passHref>
                <Button variant="contained" color="primary" sx={{ marginTop: 3 }}>
                    Volver atrás
                </Button>
            </Link>

        </Container>
    );
};

export default NotFoundPage;
