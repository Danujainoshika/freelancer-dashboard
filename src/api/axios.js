import axios from "axios";

const api = axios.create({
    baseURL: "http://13.232.231.29/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

export default api;
