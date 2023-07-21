import { FC, PropsWithChildren } from 'react';
import { SideMenu } from '../ui/SideMenu';
import { AdminNavBar } from '../admin';
import { Box, Divider, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import Swal from 'sweetalert2';
interface Props extends PropsWithChildren {
    title: string;
    subTitle: string;
    icon?: JSX.Element;

}

export const DashLayout: FC<Props> = ({ children, title, subTitle, icon }) => {
    return (
        <>

            <Box className='fadeIn'>
                {children}
            </Box>
        </>
    )
}


