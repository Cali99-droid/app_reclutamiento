import useSWR, { SWRConfiguration } from 'swr';



// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const usePostulantes = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<any[]>(`/api${ url }`,  { refreshInterval: 60000 *5} );

    return {
        pos: data || [],
        isLoading: !error && !data,
        isError: error
    }

}