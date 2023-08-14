import { mensajes } from '@prisma/client';
import useSWR, { SWRConfiguration } from 'swr';



// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useMsg = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<any[]>(`/api${ url }`, config );

    return {
        mensajes: data || [],
        isLoading: !error && !data,
        isError: error
    }

}