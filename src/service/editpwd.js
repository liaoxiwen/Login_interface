import request from '../utils/request';
import md5 from 'js-md5';

export function editpwd(params){
    const { verifyCode, password } = params;
    return request('/editpwd',{
        method: 'post',
        data :{
            ...params,
            password: md5(password),
            verifyCode: md5(verifyCode)
        }
    });
}