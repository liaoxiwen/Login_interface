import { useState } from 'react';
import { Form, Tabs, Input, Button, Row, Col, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import { sendCode } from '../../service/login';
import { editpwd } from '../../service/editpwd';
import { RES_CODES } from '../../utils/Enum';
import './Edit.css';

function EditPwd() {
    const [phoneNumber, setPoneNumber] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const [content, setContent] = useState('获取验证码');
    let timer;

    async function onSubmit(values) {
        if (Reflect.has(values, 'confirm_password')) {
            Reflect.deleteProperty(values, 'confirm_password');
        }
        const result = await editpwd(values);
        const { code, msg } = result;
        if (code === RES_CODES.SUCCESS) {
            message.success(msg);
        } else {
            message.error(msg);
        }
        console.log(result);
        return;
    }

    async function getCode() {
        const vertifyCode = await sendCode({ phonenumber: phoneNumber });
        const { code, data } = vertifyCode;
        if (code === RES_CODES.SUCCESS) {
            message.success(`验证码为: ${data}`);
        } else {
            message.error('请求错误');
        }
        return;
    }

    function inputNumber(e) {
        const { value = 'error' } = e.target;
        setPoneNumber(value);
        return;
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

    return (
        <div className="editpwd">
            <Form onFinish={onSubmit}>
                <Tabs centered='true' size='large'>
                    <Tabs.TabPane tab="修改密码"></Tabs.TabPane>
                </Tabs>
                <Form.Item
                    name="phonenumber"
                    rules={[
                        {
                            required: true,
                            message: "手机号不能为空",
                        }, {
                            pattern: "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\\d{8}$",
                            message: "请输入正确的手机号"
                        }
                    ]}
                >
                    <Input
                        size='large'
                        placeholder="手机号"
                        prefix={<MobileOutlined />}
                        onChange={inputNumber}
                    />
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
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空'
                        }, {
                            min: 5,
                            max: 10,
                            message: '密码长度为5-10'
                        }, {
                            pattern: '[0-9A-Za-z]',
                            message: "密码只能为数字或字母"
                        }
                    ]}
                >
                    <Input.Password
                        size='large'
                        placeholder="新密码"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空'
                        }, {
                            min: 5,
                            max: 10,
                            message: '密码长度为5-10'
                        }, {
                            pattern: '[0-9A-Za-z]',
                            message: "密码只能为数字或字母"
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                            }
                        }),
                    ]}

                >
                    <Input.Password
                        size='large'
                        placeholder="再次输入新密码"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        size="large"
                        className="login-form-button"
                        type='primary'
                        htmlType='submit'
                    >
                        修改密码
                         </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default EditPwd;