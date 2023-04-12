
import axios from 'axios';



const reclutApi = axios.create({
    baseURL: '/api'
});


export default reclutApi;