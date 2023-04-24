import { FC, useEffect, useReducer, useState } from 'react';
import { PostContext, postReducer } from './'
import { postulants as listPost, postulants } from '../../database/seedPost';
import { IPostulant } from '@/interfaces';
import confetti from "canvas-confetti";

export interface PostState {
      postulants: IPostulant[];
      isLoaded: boolean;
      criterios: any;

}

const POST_INITIAL_STATE: PostState = {
      postulants: [],
      isLoaded: false,
      criterios: [],

}

interface Props {
      children: JSX.Element | JSX.Element[]
}

export const PostProvider: FC<Props> = ({ children }) => {

      const [state, dispatch] = useReducer(postReducer, POST_INITIAL_STATE)
      const criterios = new Map()


      const calcularTotal = () => {
            let total = 0;
            for (var [key, value] of criterios) {
                  total += value;
            }

            return total
      }

      const limpiarCriterios = () => {
            criterios.clear()
      }


      return (
            <PostContext.Provider value={{
                  ...state,
                  criterios,
                  calcularTotal,
                  limpiarCriterios



            }}>
                  {children}

            </PostContext.Provider>
      )
}