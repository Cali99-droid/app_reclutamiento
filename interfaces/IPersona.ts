
import { IPostulant } from './IPostulant';
import { IUser } from './IUser';
import { postulante } from '@prisma/client';
export interface IPersona {
    id: number;
    nombres: string;
    apellido_pat: string;
    apellido_mat: string;
  
    postulante: postulante[]
    user: IUser[];
   
}