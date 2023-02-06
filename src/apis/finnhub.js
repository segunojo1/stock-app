 import axios from "axios";

 const TOKEN = 'cfgmjphr01qlga2uhn30cfgmjphr01qlga2uhn3g'
 export default axios.create({
    baseURL: 'https://finnhub.io/api/v1',
    params: {
        token: TOKEN
    }
 })