import axios from "axios";

const config = axios.create({
    // baseURL: "",
    baseURL: 'http://localhost:5050/api',
    // baseURL: "http://192.168.20.143:5050",
});

config.interceptors.request.use((cnfg) => {
    const token = localStorage.getItem("token");
    cnfg.headers["Content-Type"] = 'application/json';
    if(token){
        cnfg.headers.Authorization = `Bearer ${token}`;
    }
    return cnfg;
})

export default config;