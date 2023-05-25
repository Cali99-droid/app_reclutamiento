import { useContext, useState } from "react";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PostulantsList } from '../postulants/PostulantsList';
import { PostContext } from "@/context";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Divider, IconButton } from "@mui/material";
import Modal from '../modal/Modal';

/**Cabiar segun bd */
const steps = ['Preselección', 'Entrevista', 'Evaluación', 'Negociación', 'Contrato'];

export const LinearStepper = () => {


}
