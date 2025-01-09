import axios from "axios";

const req = axios.create({
    baseURL: import.meta.env.VITE_REQUEST_URL || 'http://localhost:3000',
    timeout: 10000,
})

// req.interceptors.request.use((config) => {})
req.interceptors.response.use((response) => {
    return response.data
})

export default req