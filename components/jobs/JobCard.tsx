import { FC, useMemo, useState } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, Button, CardActionArea, IconButton, Divider, Skeleton } from '@mui/material';




import { IJob } from '@/interfaces';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { ReqList } from './ReqList';
import NextLink from 'next/link';
import moment from 'moment';

import Atropos from 'atropos/react';


interface Props {
    job: IJob;
}

export const JobCard: FC<Props> = ({ job }) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);


    return (
        <Grid item
            xs={12}
            sm={4}

        >

            <Card sx={{ bgcolor: '#eeeeee' }} >
                {/* <Atropos shadow={false} 	> */}
                <NextLink href={`/convocatorias/${job.slug}`} passHref prefetch={false} legacyBehavior>

                    <Link>
                        <CardActionArea >
                            <CardMedia
                                sx={{ height: 'auto' }}
                                image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${job.img}`}
                                component="img"
                                alt={job.titulo}
                                onLoad={() => setIsImageLoaded(true)}
                            />
                            <Box width={'100%'} alignItems={'center'}>
                                <Skeleton sx={{ display: isImageLoaded ? 'none' : 'block' }} animation="wave" variant="rectangular" width={'100%'} height={400} />
                            </Box>

                            <CardContent sx={{ mt: 1, display: isImageLoaded ? 'block' : 'none' }}>
                                <Box >

                                    <Typography sx={{ color: '#000' }} fontWeight={800} gutterBottom variant="h5" component={'h5'}>
                                        {job.titulo}
                                    </Typography>

                                    <div dangerouslySetInnerHTML={{ __html: job.descripcion.substring(0, 200) + ' <br>Ver mas...' }} />



                                    {/* <Typography sx={{ color: '#767687' }} fontWeight={800} gutterBottom variant='body2'  >
                        {job.descripcion}
                    </Typography> */}

                                </Box>


                                {/* <Typography variant="body2" color="text.secondary">
                    {job.descripcion}
                </Typography> */}
                                <Divider />
                                <ReqList job={job} />
                                <Box mt={1}>

                                    <span style={{ color: '#767687' }}>

                                        Vigente hasta: {moment(job.vigencia).add(1, 'days').toDate().toLocaleDateString()}
                                    </span>
                                </Box>
                            </CardContent>
                            <Box padding={2}>
                                <Skeleton animation="wave" variant="text" width={'100%'} sx={{ display: isImageLoaded ? 'none' : 'block' }} height={60} />
                                <Skeleton animation="wave" variant="text" width={210} sx={{ display: isImageLoaded ? 'none' : 'block' }} height={60} />
                            </Box>

                        </CardActionArea>

                    </Link>

                </NextLink>
                {/* </Atropos> */}
                <CardActions sx={{ display: isImageLoaded ? 'flex' : 'none', justifyContent: 'space-around' }} >

                    <Button color='secondary' startIcon={<PostAddIcon />} sx={{ mt: 3, width: '100%' }} size="large" href={`/postulant/postular/${job.id}`}>
                        Postular
                    </Button>


                </CardActions>
                <Box padding={2}>
                    <Skeleton sx={{ display: isImageLoaded ? 'none' : 'block' }} animation="wave" variant="rounded" width={'100%'} height={40} />
                </Box>
            </Card>



        </Grid>
    )
}
