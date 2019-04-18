import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bikewise.org:443'
});

export default instance;