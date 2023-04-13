
import { PostState } from './PostProvider';
import { IPostulant } from '@/interfaces';
import App from '../../pages/_app';

   type PostType = 
   |{type:'Post - Load',payload:IPostulant[]}
   |{type:'Post - favorite', payload:boolean}
   
    export const postReducer =(state:PostState,action:PostType):PostState=>{

       switch (action.type) {
           case 'Post - Load':
                   return{
                         ...state,
                         
                         postulants:[...action.payload],
                       
                         }
            case 'Post - favorite':
            return{
                    ...state,
                    isLoaded:true,
                    
                    
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