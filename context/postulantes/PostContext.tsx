import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      criterios: any,
      calcularTotal: () => number
      limpiarCriterios: () => void
      idUser: any

      //Modales
      openClase: boolean
      handleOpenClase: (id: number) => void
      handleCloseClase: () => void

      handleConfirmClase: () => Promise<void>

      openAptitud: boolean
      handleOpenAptitud: (id: number) => void
      handleConfirmAptitud: () => Promise<void>
      handleCloseAptitud: () => void
}
export const PostContext = createContext({} as ContextProps);