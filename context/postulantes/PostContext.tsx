import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      criterios: any,
      calcularTotal: () => number
      limpiarCriterios: () => void
}
export const PostContext = createContext({} as ContextProps);