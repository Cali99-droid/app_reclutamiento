import { FC, useEffect, useReducer } from 'react';
import { PostContext,postReducer } from './'
import { postulants as listPost, postulants } from '../../database/seedPost';
import { IPostulant } from '@/interfaces';


export interface PostState{
     postulants: IPostulant[];
     isLoaded: boolean;
}

const POST_INITIAL_STATE: PostState={
      postulants:[],
      isLoaded: false,
      
}

 interface Props{
   children: JSX.Element | JSX.Element[]
  }

export const PostProvider:FC<Props> = ({children}) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)


      useEffect(() => {
        
            try {
                
                  dispatch({ type: 'Post - Load', payload: listPost })
                  
            } catch (error) {
                  dispatch({ type: 'Post - Load', payload: [] })
            }
      }, [])

      const advancePhase =(postulant:IPostulant)=>{

            const newList = postulants.map((post)=>{
                  if(post.id === postulant.id && postulant.fase<5){
                       post.fase = post.fase +1  
                  }
                  return post;
            })
         
            // console.log(newList)
          
           dispatch({ type: 'Post - Load', payload: newList });
      }

      const backPhase =(postulant:IPostulant)=>{

            const newList = postulants.map((post)=>{
                  if(post.id === postulant.id && postulant.fase>1){
                       post.fase = post.fase -1  
                  }
                  return post;
            })
         
           dispatch({ type: 'Post - Load', payload: newList });
      }
      
      return (
          <PostContext.Provider value={{
            ...state,


            //methods
            advancePhase,
            backPhase
           }}>
                 {children}

          </PostContext.Provider>
    )
}