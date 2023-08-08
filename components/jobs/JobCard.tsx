import { FC } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, Button, CardActionArea, IconButton, Divider } from '@mui/material';




import { IJob } from '@/interfaces';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { ReqList } from './ReqList';
import NextLink from 'next/link';
import moment from 'moment';




interface Props {
    job: IJob;
}

export const JobCard: FC<Props> = ({ job }) => {


    return (
        <Grid item
            xs={12}
            sm={4}

        >

            <Card sx={{ bgcolor: '#eeeeee' }} >

                <NextLink href={`/convocatorias/${job.slug}`} passHref prefetch={false} legacyBehavior>

                    <Link>
                        <CardActionArea >
                            <CardMedia
                                sx={{ height: 'auto' }}
                                image={`${process.env.NEXT_PUBLIC_URL_IMG_BUCKET}${job.img}`}
                                component="img"

                            />
                            <CardContent >
                                <Box >

                                    <Typography sx={{ color: '#000' }} fontWeight={800} gutterBottom variant="h5" >
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

                        </CardActionArea>

                    </Link>

                </NextLink>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }} >

                    <Button color='secondary' startIcon={<PostAddIcon />} sx={{ mt: 3, width: '100%' }} size="large" href={`/postulant/postular/${job.id}`}>
                        Postular
                    </Button>


                </CardActions>
            </Card>



        </Grid>
    )
}
