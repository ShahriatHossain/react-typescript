import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://bikewise.org:443'
});

instance.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export default instance;