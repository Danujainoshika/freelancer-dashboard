import axios from "axios";

const api = axios.create({
    baseURL: "http://13.232.231.29:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

