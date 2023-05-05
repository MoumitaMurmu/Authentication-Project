
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onFinish = (values) => {
    fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.username,
        password: values.password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
           throw new Error("Invalid username or password");
          
        }
      })
      .then((data) => {
        dispatch({ type: "LOGIN", payload: data });
        navigate('/profile');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="container">
    
    <div className="login-page">
    <br/>
      <Title level={1} id="login-title-text">Login
      
      </Title>
      {error && <div>{error}</div>}
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input id="input-btn" prefix={<UserOutlined />} placeholder="Username"/>
        </Form.Item>
       
        <Form.Item
          name="password"
          
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password id="input-btn" prefix={<LockOutlined />} placeholder="Password"/>
        </Form.Item>
        
        <Form.Item>
          <Button id="login-btn" type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
}

export default Login;
