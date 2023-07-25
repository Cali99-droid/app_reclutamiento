import React, { FC, PropsWithChildren, useContext, useEffect } from 'react';
import Head from 'next/head';

import { NavBar } from '../ui';
import { SideMenu } from '../ui/SideMenu';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box } from '@mui/material';
import { AuthContext } from '@/context';
import { inactivity } from '@/helpers';

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
                <meta name="description" content={pageDescription} />
                <meta name="referrer" content="no-referrer" />


                <meta property="og:image" content={`https://caebucket.s3.us-west-2.amazonaws.com/img/${imageFullUrl}`} />
                <meta name="og:title" content={title} />
                <meta name="og:description" content={pageDescription} />

                {
                    imageFullUrl && (
                        <meta name="og:image" content={imageFullUrl} />
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


