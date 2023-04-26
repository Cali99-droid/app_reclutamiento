import { FC, PropsWithChildren } from 'react';
import Head from 'next/head';

import { NavBar } from '../ui';
import { SideMenu } from '../ui/SideMenu';


interface Props extends PropsWithChildren {
    title: string;
    pageDescription: string;
    imageFullUrl?: string;

}

export const JobsLayout: FC<Props> = ({ children, title, pageDescription, imageFullUrl }) => {
    return (
        <>
            <Head>
                <title>{title}</title>

                <meta name="description" content={pageDescription} />


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


            <main style={{
                margin: '50px auto',
                width: '100%',
                background: '#F3F3F3',
            }}>
                {children}
            </main>

            {/* Footer */}
            <footer>
                {/* TODO: mi custom footer */}
            </footer>

        </>
    )
}


