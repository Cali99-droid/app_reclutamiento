import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      criterios: any,
      calcularTotal: () => number
      limpiarCriterios: () => void


      //Modales
      openClase: boolean
      handleOpenClase: (id: number) => void
      handleCloseClase: () => void

      handleConfirmClase: () => Promise<void>
}
export const PostContext = createContext({} as ContextProps);