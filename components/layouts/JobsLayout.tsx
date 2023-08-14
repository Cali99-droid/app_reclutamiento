import React, { FC, PropsWithChildren, useContext, useEffect } from 'react';
import Head from 'next/head';

import { NavBar } from '../ui';
import { SideMenu } from '../ui/SideMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import { AuthContext } from '@/context';
import { inactivity } from '@/helpers';
import { useMsg } from '@/hooks';
import { useRouter } from 'next/router';

interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;

}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;


export const JobsLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    const props = {
        window: undefined,
        children: React
    }
    const { user } = useContext(AuthContext);
    const { push } = useRouter()

    const { mensajes } = useMsg(`/msg/1`)
    // const noLeidos = mensajes.filter(m => m.status !== 1);
    useEffect(() => {
        if (user) {
            const noLeidos = mensajes.filter(m => m.status !== 1);
            if (noLeidos.length > 0) {

                if (Notification.permission !== 'granted') {
                    requestNotificationPermission()
                }
                showNotification()
            }
        }


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensajes])
    const requestNotificationPermission = async () => {
        try {
            const permissionResult = await Notification.requestPermission();
            console.log('Permission:', permissionResult);
        } catch (error) {
            console.error('Error requesting permission:', error);
        }
    };
    const showNotification = () => {
        if (Notification.permission === 'granted') {
            const notification = new Notification('Tienes un nuevo mensaje', {
                body: '¡Hola, tienes un nuevo mensaje del la oficina de talento humano del Colegio Albert Einstein!',
                icon: '/img/logo.png', // Ruta a tu icono de notificación
            });

            notification.onclick = () => {
                push('/postulant/postulaciones');

            };
        }
    };
    // if (user) {

    //     inactivity.inactivityTime()
    // } else {
    //     console.log(false)
    // }




    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />
                {/* <meta name="description" content={pageDescription} /> */}
                <meta name="referrer" content="no-referrer" />


                {/* <meta property="og:image" content={`${origin}/img/${imageFullUrl}`} /> */}
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={`https://caebucket.s3.us-west-2.amazonaws.com/img/${imageFullUrl}`} />
                    )
                }

            </Head>

            <SideMenu />
            <nav>

                <NavBar />
            </nav>

            <ToastContainer />
            <main style={{
                margin: '0 auto',
            }}>

                {children}
            </main>


        </>
    )
}


