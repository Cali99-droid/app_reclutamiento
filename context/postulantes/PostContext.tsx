import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      total: number
      criterios: any,
      calcularTotal: () => number
      limpiarCriterios: () => void
      idUser: any
      juradosAsignados: any[]
      idPos: string | number
      //Modales
      openClase: boolean
      handleOpenClase: (id: number) => void
      handleCloseClase: () => void

      handleConfirmClase: () => Promise<void>

      openAptitud: boolean
      handleOpenAptitud: (id: number) => void
      handleConfirmAptitud: () => Promise<void>
      handleCloseAptitud: () => void

      addNewJurado: (jurado: string) => Promise<{
            err: boolean;
            message: string;
      }>

      deleteJurado: (idJurado: number) => Promise<void>
      refreshJurados: () => Promise<void>
}
export const PostContext = createContext({} as ContextProps);