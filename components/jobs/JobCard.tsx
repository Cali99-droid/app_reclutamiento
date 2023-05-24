import { FC, useEffect } from 'react';

import { Grid, Card, CardActions, CardMedia, Box, Typography, Link, Chip, CardContent, Button, CardActionArea, IconButton, ListItemAvatar, ListItemText, ListItem, styled } from '@mui/material';




import { IJob } from '@/interfaces';
import ShareIcon from '@mui/icons-material/Share';
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
            <Card>

                <NextLink href={`/convocatorias/${job.id}`} passHref prefetch={false} legacyBehavior>

                    <Link>
                        <CardActionArea>
                            <CardMedia
                                sx={{ height: 250 }}
                                image="/img/work.svg"

                            />
                            <CardContent>
                                <Box display={'flex'} gap={1}>

                                    <Typography fontWeight={800} gutterBottom variant="h5" >
                                        {job.titulo}
                                    </Typography>

                                    <Box>
                                        <IconButton aria-label="share" size='small'>
                                            <ShareIcon />
                                        </IconButton>
                                    </Box>

                                </Box>

                                {/* <Typography variant="body2" color="text.secondary">
                                    {job.descripcion}
                                </Typography> */}
                                <ReqList job={job} />
                                <Box mt={1}>

                                    <span style={{ color: 'gray' }}>

                                        Vigente hasta: {moment(job.vigencia).toDate().toLocaleDateString()}
                                    </span>
                                </Box>
                            </CardContent>

                        </CardActionArea>

                    </Link>

                </NextLink>
                <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Button color='info' startIcon={<PostAddIcon />} sx={{ mt: 3, width: '100%' }} size="large" href={`/postulant/postular/${job.id}`}>
                        Postular
                    </Button>


                </CardActions>
            </Card>

        </Grid>
    )
}
