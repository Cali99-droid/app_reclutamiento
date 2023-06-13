import { Box, Chip, Divider, Link, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import SquareIcon from '@mui/icons-material/Square';

import Image from 'next/image';
import { useJobs } from '@/hooks';
import { FullScreenLoading } from '@/components/ui';
import { JobList } from '@/components/jobs';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/router';

export const Convocatorias = () => {
    const { jobs, isLoading } = useJobs('/convocatorias')
    const convocatorias = jobs.slice(0, 3)
    const matches = useMediaQuery('(min-width:600px)');
    const { push } = useRouter();
    return (
        <Box className='fadeIn' mt={10}>
            <Box display={'flex'} alignItems={'center'} gap={1} justifyContent={matches ? 'start' : 'center'} mb={2}>
                <SquareIcon color="secondary" fontSize="large" />
                <Typography variant='h2' component='h2' fontWeight={'bold'} fontSize={40} color={'#000'} > Convocatorias </Typography>
            </Box>

            <Box className="fadeIn" maxWidth={1200} sx={{ margin: 'auto' }} >

                <Box >
                    {isLoading
                        ? <FullScreenLoading />
                        :
                        <JobList jobs={convocatorias} />
                    }
                    {jobs.length === 0 && (
                        <Box bgcolor={grey[50]} padding={3} borderRadius={2} width={'100%'} >
                            <Typography color={grey[800]} variant='h2' textAlign={'center'}>No hay convocatorias abiertas, pronto tendremos nuevas convocatorias</Typography>
                        </Box>
                    )}
                </Box>
                <Box textAlign={'end'} mt={2} mb={2}>
                    <Chip
                        onClick={() => push('/convocatorias')}
                        label="Ver mas convocatorias"
                        color="secondary"
                        clickable
                        variant='outlined'

                    />
                </Box>
            </Box>


        </Box>
    )
}
