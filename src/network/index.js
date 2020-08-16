import axios from 'axios';
const local = 'http://localhost:8080'
const remote = '121.41.225.12';

const ins = axios.create({
    baseURL: local,
    timeout: 5000
});

ins.interceptors.request.use(config => {
    config.headers['Authorization'] = localStorage.getItem('token');
    return config;
})


ins.interceptors.response.use(response => {

    return { ...response.data, status: response.status };
}, (err) => {
    console.log(err.response);
    const { data: { msg }, status } = err.response;
    console.log(msg);

})








export default ins;