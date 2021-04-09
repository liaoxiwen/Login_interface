import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, message, Tabs, Checkbox, Row, Col } from "antd";
import { pwdLogin, codeLogin } from "../../service/login";
import { LOGINWAY } from "../../utils/Enum";
import PwdLogin from "./PwdLogin";
import CodeLogin from "./CodeLogin";
import 'antd/dist/antd.css';
import './Login.css';


function Login() {
    const [loginWay, setLogin] = useState(LOGINWAY.PWDLOGIN);
    function onSubmit(values) {
        if (loginWay === LOGINWAY.PWDLOGIN) {
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
                {loginWay ? <div style={{ "marginBottom": "24px", "textAlign": "left" }}>
                    <Checkbox>自动登录</Checkbox>
                    <span style={{ float: "right" }}><Link to='/editpwd'>忘记密码 ?</Link></span>

                </div> : ' '}
                <Form.Item>
                    <Row>
                        <Col span={11}>
                            <Button
                                block
                                size="large"
                                type='primary'
                                htmlType='submit'
                            >
                                登录
                         </Button>
                        </Col>
                        <Col span={2} />
                        <Col span={11}>
                            <Button
                                block
                                size="large"
                            >
                                <Link to='/sign'>注册</Link>
                            </Button>
                        </Col>
                    </Row>

                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
