import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      criterios: any,
      calcularTotal: () => number
}
export const PostContext = createContext({} as ContextProps);