import { FC, useEffect, useReducer, useState, useContext } from 'react';
import { PostContext, postReducer } from './'
import { postulants as listPost, postulants } from '../../database/seedPost';
import { IPostulant } from '@/interfaces';
import confetti from "canvas-confetti";
import { reclutApi } from '@/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { AuthContext } from '../auth';

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



      const { user } = useContext(AuthContext)




      //-----EValuaciones
      const router = useRouter();
      const { id } = router.query
      const [idEv, setIdEv] = useState<string | number>('');
      const [idPos, setIdPos] = useState<string | number>('');
      const [openClase, setOpenClase] = useState(false)

      const handleOpenClase = (id: number) => {

            if (user?.rol_id === 3) {
                  setOpenClase(true);
            }

            if (user?.rol_id === 4) {
                  setOpenAptitud(true);
            }


            setIdPos(id)
            setIdEv(2)
      };

      const handleCloseClase = () => {
            setOpenClase(false);
      };



      const handleConfirmClase = async () => {
            //TODO validar actualizacion o creacion  */


            const puntaje = calcularTotal();


            try {

                  const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100 });
                  console.log(resp)
                  toast.success('🦄 Puntaje asignado correctamente0!'),
                        handleCloseClase()
                  limpiarCriterios()

            } catch (error) {

                  console.log(error);
                  alert('El postulante ya tiene puntaje');
            }

      };

      //-------------------------------------------------------------------
      const [openAptitud, setOpenAptitud] = useState(false)
      const handleOpenAptitud = (id: number) => {
            setOpenAptitud(true);
            setIdPos(id)
            setIdEv(2)
      };

      const handleCloseAptitud = () => {
            setOpenAptitud(false);
      };
      const handleConfirmAptitud = async () => {
            //TODO validar actualizacion o creacion  */


            const puntaje = calcularTotal();


            try {

                  const resp = await reclutApi.post('/admin/evaluaciones', { id, puntaje, idPos, idEv, max: 100 });
                  console.log(resp)
                  toast.success('🦄 Puntaje asignado correctamente!'),
                        handleCloseAptitud()
                  limpiarCriterios()

            } catch (error) {

                  console.log(error);
                  alert('El postulante ya tiene puntaje');
            }





      };


      return (
            <PostContext.Provider value={{
                  ...state,
                  criterios,
                  calcularTotal,
                  limpiarCriterios,

                  //Modales
                  handleOpenClase,
                  openClase,
                  handleCloseClase,
                  handleConfirmClase,

            }}>
                  {children}

            </PostContext.Provider>
      )
}