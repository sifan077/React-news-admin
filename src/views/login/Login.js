import React from 'react';
import {Button, Form, Input, message} from 'antd';

import {UserOutlined, LockOutlined} from "@ant-design/icons";

import {useNavigate} from "react-router";
import './Login.css';
import axios from "axios";


function Login(props) {
    const navigate = useNavigate();
    const onFinish = (from) => {
        console.log(from);
        axios.get("/users?username=" + from.username
            + "&password=" + from.password + "&roleState=true&_expand=role")
            .then(res => {
                // console.log(res.data);
                if (res.data.length > 0) {
                    localStorage.setItem("token", JSON.stringify(res.data[0]));
                    navigate("/home");
                } else {
                    message.error("用户名或密码错误");
                }
            });
    }
    return (
        <div style={{background: 'rgb(56,64,130)', height: "100vh",}}>
            <div className="formContainer">
                <div className="loginTitle">
                    全球新闻发布管理系统
                </div>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: '请输入用户名!'}]}>
                        <Input prefix={<UserOutlined/>} placeholder="用户名"/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{required: true, message: '请输入密码!'}]}>
                        <Input
                            prefix={<LockOutlined/>}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;