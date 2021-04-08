import request from "../utils/request";
import md5 from 'js-md5';

export function pwdLogin(params) {
    // params md5加密
    const { username,password } = params;
    const newpwd = md5(password);
    const result = request('/pwdlogin',{
        method: "post",
        data: {
            username,
            password: newpwd
        }
    });
    result.then((res)=>{
        const { token } = res;
        sessionStorage.setItem('token',token);
    })
    return result;
}

export function sendCode(params){
    const { phonenumber } = params;
    return request('/code',{
        method: 'post',
        data: {
            phonenumber,
        }
    });
}

export function codeLogin(params){
    const { phonenumber, verifyCode } = params;
    const mdCode = md5(verifyCode);
    return request('/codelogin',{
        method: 'post',
        data :{
            phonenumber,
            verifyCode: mdCode
        }
    });
}
