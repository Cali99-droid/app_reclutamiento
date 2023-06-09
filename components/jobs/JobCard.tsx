import { FC } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, CardContent, Button, CardActionArea, IconButton } from '@mui/material';




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
            <Card sx={{ bgcolor: '#0045AA' }} >

                <NextLink href={`/convocatorias/${job.id}`} passHref prefetch={false} legacyBehavior>

                    <Link>
                        <CardActionArea >
                            <CardMedia
                                sx={{ height: 250 }}
                                image="/img/img-2.jpg"

                            />
                            <CardContent >
                                <Box display={'flex'} gap={1}>

                                    <Typography sx={{ color: '#FFF' }} fontWeight={800} gutterBottom variant="h5" >
                                        {job.titulo}
                                    </Typography>

                                </Box>

                                {/* <Typography variant="body2" color="text.secondary">
                                    {job.descripcion}
                                </Typography> */}
                                <ReqList job={job} />
                                <Box mt={1}>

                                    <span style={{ color: '#EEEDFF' }}>

                                        Vigente hasta: {moment(job.vigencia).add(1, 'days').toDate().toLocaleDateString()}
                                    </span>
                                </Box>
                            </CardContent>

                        </CardActionArea>

                    </Link>

                </NextLink>
                <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }} >

                    <Button color='primary' startIcon={<PostAddIcon />} sx={{ mt: 3, width: '100%' }} size="large" href={`/postulant/postular/${job.id}`}>
                        Postular
                    </Button>


                </CardActions>
            </Card>

        </Grid>
    )
}
