import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true
});

const publicApi = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: false
})

export default api;
export { publicApi };