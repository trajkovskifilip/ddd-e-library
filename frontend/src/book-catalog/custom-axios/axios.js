import axios from "axios";

const bookInstance = axios.create({
    baseURL: 'http://localhost:9090/api',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

const borrowingInstance = axios.create({
    baseURL: 'http://localhost:9091/api',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default {bookInstance, borrowingInstance};