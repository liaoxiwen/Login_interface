import { useState } from 'react';
import { Form, Button, message, Tabs, Checkbox } from "antd";
import { pwdLogin, codeLogin } from "../../service/login";
import { LoginWay } from "../../utils/Enum";
import PwdLogin from "./PwdLogin";
import CodeLogin from "./CodeLogin";
import 'antd/dist/antd.css';
import './Login.css';


function Login() {
    const [loginWay, setLogin] = useState(LoginWay.PWDLOGIN);
    function onSubmit(values) {
        if (loginWay === LoginWay.PWDLOGIN) {
            const response = pwdLogin(values);
            response.then((res) => {
                const { code, msg } = res;
                if (code === 0) {
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            });
        } else {
            const response = codeLogin(values);
            response.then((res) => {
                const { code, msg } = res;
                if (code === 0) {
                    message.success(msg);
                } else {
                    message.error(msg);
                }
            });
        }

    }

    return (
        <div className="login">
            <Form
                onFinish={onSubmit}
            >
                <Tabs
                    defaultActiveKey="1"
                    onChange={(e) => { setLogin(parseInt(e)) }}
                    centered={true}
                    size='large'
                >
                    <Tabs.TabPane key="1" tab="账号密码登录"></Tabs.TabPane>
                    <Tabs.TabPane key="0" tab="手机号登录"></Tabs.TabPane>
                </Tabs>
                {loginWay ? <PwdLogin /> : <CodeLogin />}
                <div style={{"marginBottom": "24px","textAlign":"left"}}>
                    <Checkbox>自动登录</Checkbox>
                    <a style={{float:'right'}} href='true' >忘记密码 ?</a>
                </div>
                <Form.Item>
                    <Button
                        size="large"
                        className="login-form-button"
                        type='primary'
                        htmlType='submit'
                    >
                        登录
                         </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
