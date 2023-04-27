
import { PostState } from './PostProvider';
import { IPostulant } from '@/interfaces';

   type PostType = 
   |{type:'Post - Load',payload:IPostulant[]}
   |{type:'Post - update phase postulant', payload:IPostulant[]}
   
    export const postReducer =(state:PostState,action:PostType):PostState=>{

       switch (action.type) {
           case 'Post - Load':
                   return{
                         ...state,
                         isLoaded:true,
                         postulants:[...action.payload],
                        
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