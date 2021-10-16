import axios from 'axios';

const instance = axios.create({
    //baseURL: "https://netflix-test-server.herokuapp.com/api/",
    baseURL: "http://localhost:8080/api/",
})

export default instance;