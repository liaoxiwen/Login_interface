import React, { useState } from 'react';
import { Form, Input, Row, Col, Button, message } from "antd";
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import { sendCode } from '../../service/login';

function CodeLogin() {
    const [phoneNumber, setPoneNumber] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const [content, setContent] = useState('获取验证码');
    let timer;

    function getCode() {
        const result = sendCode({ phonenumber: phoneNumber });
        result.then((res) => {
            const { code = 1, data = "error" } = res;
            if (code === 0) {
                // clearInterval(timer);
                message.success(`验证码为:${data}`);
            } else {
                message.error('用户不存在');
            }
        }).catch(() => {
            message.error('请求失败');
        })
    }

    function buttonClick() {
        if (!phoneNumber) {
            message.error('手机号为空!');
            return;
        }
        getCode();
        setContent('60s后重新获取');
        setButtonStatus(true);
        let index = 60;
        timer = setInterval(() => {
            index--;
            setContent(`${index}s后重新获取`);
            if (index === 0) {
                clearInterval(timer);
                index = 60;
                setButtonStatus(false);
                setContent('验证码');
            }
        }, 1000);
    }

    function inputNumber(e) {
        const { value = 'error' } = e.target;
        setPoneNumber(value);
    }

    return (
        <>
            <Form.Item
                name="phonenumber"
                rules={[
                    {
                        required: true,
                        message: "手机号码不能为空",
                    }, {
                        pattern: "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
                        message: "请输入正确的手机号码"
                    }
                ]}
            >
                <Input
                    autoComplete="off"
                    size="large"
                    placeholder="手机号"
                    prefix={<MobileOutlined />}
                    onChange={inputNumber} />
            </Form.Item>
            <Form.Item
                name="verifyCode"
                rules={[
                    {
                        required: true,
                        message: "验证码不能为空"
                    }
                ]}
            >
                <Row>
                    <Col span={14}>
                        <Input
                            size="large"
                            autoComplete="off"
                            placeholder="验证码"
                            prefix={<MailOutlined />}
                        />
                    </Col>
                    <Col span={1} />
                    <Col span={9}>
                        <Button
                            size="large"
                            block
                            disabled={buttonStatus}
                            onClick={buttonClick}
                        >
                            {content}
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </>
    )
}

export default CodeLogin;
