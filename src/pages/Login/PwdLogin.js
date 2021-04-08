import { Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';

function pwdLogin() {
    return (
        <>
            <Form.Item
                name="username"
                rules={[
                    {
                        required: true,
                        message: "用户名不能为空",
                    }
                ]}
            >
                <Input
                    size="large"
                    autoComplete="off"
                    placeholder="账号"
                    prefix={<UserOutlined />}
                />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: "密码不能为空",
                    }, {
                        min: 5,
                        max: 10,
                        message: "请输入5-10位以内的密码"
                    }, {
                        pattern: '[0-9A-Za-z]',
                        message: "密码只能为数字或字母"
                    }
                ]}
            >
                <Input.Password
                    size="large"
                    autoComplete="off"
                    type="password"
                    placeholder="密码"
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Form.Item>
        </>
    )
}

export default pwdLogin;
