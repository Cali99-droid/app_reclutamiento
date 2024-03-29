import { FC, PropsWithChildren, useContext } from 'react';
import { SideMenu } from '../ui/SideMenu';
import { AdminNavBar } from '../admin';
import { Box, Divider, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { AuthContext } from '@/context';
import { inactivity } from '@/helpers';


interface Props extends PropsWithChildren {
    title: string;
    subTitle: string;
    icon?: JSX.Element;

}

export const AdminLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
    const { user } = useContext(AuthContext);
    // if (user) {

    //     inactivity.inactivityTime()
    // } else {
    //     console.log(false)
    // }
    return (
        <>    <ToastContainer />
            <nav>
                <AdminNavBar />
            </nav>

            <SideMenu />
            <main style={{
                margin: '80px auto',
                maxWidth: '1440px',
                padding: '0px 30px'
            }}>
                <Box display={'flex'} flexDirection={'column'} mt={15} >
                    <Typography variant='h1' component={'h1'} mb={1}>
                        {icon}
                        {title}
                    </Typography>

                    <Typography variant='h2' component={'h2'} >
                        {subTitle}
                    </Typography>



                </Box>
                <Divider variant="middle" />
                <Box className='fadeIn'>
                    {children}
                </Box>

            </main>



        </>
    )
}


