import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps{
      postulants:IPostulant[];
}
export const PostContext  = createContext({}as ContextProps);