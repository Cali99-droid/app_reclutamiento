
import useSWR, { SWRConfiguration } from 'swr';
import { IJob } from '../interfaces';


// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());

export const useJobs = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IJob[]>(`/api${ url }`, config );
   
    return {
        jobs: data || [],
        isLoading: !error && !data,
        isError: error
    }
}