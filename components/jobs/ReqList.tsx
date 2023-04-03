import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import { indigo, blue,cyan } from '@mui/material/colors';

import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';


import { IJob } from '@/interfaces';


interface Props {
    job: IJob;
}
export  const  ReqList: React.FC<Props> = ({job})=> {
  return (
    <List sx={{ width: '100%', maxWidth: 360  }}>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: cyan[500] }}>
            <SchoolIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary={job.requisito} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar  sx={{ bgcolor: blue[500] }}>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={job.especialidad}  />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
        <Avatar sx={{ bgcolor: indigo[500] }}>
            <AssignmentIcon />
        </Avatar>
        </ListItemAvatar>
        <ListItemText primary={job.categoria} />
      </ListItem>
     
    </List>
  );
}