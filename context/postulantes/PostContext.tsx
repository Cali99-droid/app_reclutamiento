import { IPostulant } from '@/interfaces';
import { createContext } from 'react';



interface ContextProps{
      postulants:IPostulant[];
      isLoaded: boolean;
      activeStep: number;
      filteredData: IPostulant[];
      contrato: boolean;
      openAdvance: boolean;
      empty:boolean;
    


      verificarVacio: () => void,
      backPhase:(postulant: IPostulant) => void,
      handleNext: () => void,
      handleBack: () => void,
      handleReset: () => void,
      handleClickOpenAdvance: () => void,
      handleCloseAdvance: () => void,
      marcarApto:(postulant: IPostulant) => void,
      quitarApto: (postulant: IPostulant) => void
}
export const PostContext  = createContext({}as ContextProps);