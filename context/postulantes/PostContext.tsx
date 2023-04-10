import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps{
      postulants:IPostulant[];
      isLoaded: boolean;



     updatePhase: (postulant: IPostulant) => void
}
export const PostContext  = createContext({}as ContextProps);