import { IPostulant } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
      total: number
      criterios: any,
      calcularTotal: () => number
      limpiarCriterios: () => void
      idUser: any
      juradosAsignados: any[]

      //Modales
      openClase: boolean
      handleOpenClase: (id: number) => void
      handleCloseClase: () => void

      handleConfirmClase: () => Promise<void>

      openAptitud: boolean
      handleOpenAptitud: (id: number) => void
      handleConfirmAptitud: () => Promise<void>
      handleCloseAptitud: () => void

      addNewJurado: (jurado: string) => Promise<void>
      deleteJurado: (idJurado: number) => Promise<void>
      refreshJurados: () => Promise<void>
}
export const PostContext = createContext({} as ContextProps);