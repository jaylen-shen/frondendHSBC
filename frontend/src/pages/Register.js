import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Sending POST request to backend to register a new user
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (response.status === 201) {
        // If registration is successful, navigate to login page
        navigate('/login');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '50px' }}>
      <h2>Register</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
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
            Register
          </Button>
          <Button type="default" onClick={handleBackClick}>
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
