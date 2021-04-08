import { Form, Button, Tabs, Input, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import { sign } from '../../service/sign'
import './Sign.css';

function Sign() {
    function onSubmit(values) {
        console.log(values);
        if(Reflect.has(values,'confirm_password')){
            Reflect.deleteProperty(values,'confirm_password');
        }
        const result = sign(values);
        console.log(result);
    }
    return (
        <div className="sign">
            <Form onFinish={onSubmit}>
                <Tabs centered='true' size='large'>
                    <Tabs.TabPane tab="用户注册"></Tabs.TabPane>
                </Tabs>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '用户名不能为空'
                        },
                        {
                            max: 10,
                            message: '用户名长度不能超过10'
                        }
                    ]}
                >
                    <Input
                        size='large'
                        placeholder="用户名"
                        prefix={<UserOutlined />}
                    />
                </Form.Item>
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
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            pattern: "^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,20}$",
                            message: "请输入正确的邮箱号"
                        }
                    ]}
                >
                    <Input
                        size='large'
                        placeholder="邮箱号"
                        prefix={<MailOutlined />}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空'
                        },
                        {
                            max: 10,
                            message: '密码长度不能超过10'
                        }
                    ]}
                >
                    <Input.Password
                        size='large'
                        placeholder="密码"
                        prefix={<LockOutlined />}
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>
                <Form.Item
                    name="confirm_password"
                    dependencies={['password']}
                    rules={[
                        {
                            required: true,
                            message: '请重复输入的密码',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不一致'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size='large'
                        placeholder="再次输入密码"
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
                        注册
                         </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
export default Sign;