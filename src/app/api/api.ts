import axios from 'axios';

const api = axios.create({
    baseURL: "http://speed.assistant.com.br:8082"
});

export { api };