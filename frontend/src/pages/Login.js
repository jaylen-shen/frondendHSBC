import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

const Login = () => {
  const [user, setUser] = useState(null); // Local state to manage the logged-in user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null); // Clear previous error

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        credentials: 'include', // Include credentials (cookies)
      });

      if (response.ok) {
        const userData = await response.json();
        
        localStorage.setItem('token', userData.token); // Store token in local storage
        setUser(userData); // Set the user in the local state
        navigate('/dashboard'); // Redirect to the root path (http://localhost:3002/)
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Login failed. Please try again.');
      }
      
    } catch (err) {
      console.error('Error logging in:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If the user is already logged in, redirect to the dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px' }}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: '10px' }}>
            Login
          </Button>
          <Link to="/register">
            <Button type="default">
              Register
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
