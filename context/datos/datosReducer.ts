
import { DatosState } from './DatosProvider';
import { IPostulant } from '@/interfaces';

type DatosType =
    | { type: 'Post - Load', payload: IPostulant[] }
    | { type: 'Post - update phase postulant', payload: IPostulant[] }

export const datosReducer = (state: DatosState, action: DatosType): DatosState => {

    switch (action.type) {
        case 'Post - Load':
            return {
                ...state,



            }
        // case 'Post - update phase postulant':
        //     return{
        //         ...state,
        //         isLoaded:true,
        //         postulants:[...action.payload],
        //     }
        default:
            return state;
    }
}    