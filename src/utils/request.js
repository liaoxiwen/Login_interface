import axios from "axios";

export default function request(url, params) {
    const token = sessionStorage.getItem('token') || '';
    return axios({
        baseURL: 'http://127.0.0.1/',
        url: url,
        ...params,
        withCredentials: true
    }).then((res)=>{
        const {data} = res;
        return data;
    }).catch((err)=>{
        return err;
    })
}
