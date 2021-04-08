import request from '../utils/request';
import md5 from 'js-md5';

export function sign(params){
    console.log(params);
    const { password } = params;
    const newPwd = md5(password);
    const result = request('/sign',{
        method: "post",
        data: {
            ...params,
            password: newPwd
        }
    });
    return result;
}