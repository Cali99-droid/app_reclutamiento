import { FC, useReducer } from 'react';
import { PostContext,postReducer } from './'
import { postulants } from '../../database/seedPost';


export interface PostState{
     postulants: [];
}

const POST_INITIAL_STATE: PostState={
      postulants:[],
}

 interface Props{
   children: JSX.Element | JSX.Element[]
  }

export const PostProvider:FC<Props> = ({children}) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)

      return (
          <PostContext.Provider value={{
              postulants:[] 
           }}>
                 {children}

          </PostContext.Provider>
    )
}