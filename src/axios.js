import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:5001/fir-d55a1/us-central1/api"
})

export default instance