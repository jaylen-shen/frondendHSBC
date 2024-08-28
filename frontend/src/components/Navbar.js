import React, { useContext } from 'react';
import { Layout, Button, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const { Header } = Layout;

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  const handleMenuClick = (e) => {
    if (e.key === 'profile') {
      navigate('/profile');
    } else if (e.key === 'dashboard') {
      navigate('/dashboard');
    } else if (e.key === 'logout') {
      logout();
      navigate('/login');
    }
  };

  const dashboardMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">
        Profile
      </Menu.Item>
      <Menu.Item key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  const profileMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="dashboard">
        Dashboard
      </Menu.Item>
      <Menu.Item key="logout">
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ color: '#fff', fontSize: '20px' }}>Financial Dashboard</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user && (
          <>
            <span style={{ color: '#fff', marginRight: '20px' }}>
              {user.username}
            </span>
            <Button type="primary" onClick={logout} style={{ marginRight: '20px' }}>
              Logout
            </Button>
          </>
        )}
        {/* Conditionally render the user icon with a dropdown menu on the /dashboard and /profile routes */}
        {location.pathname === '/dashboard' && (
          <Dropdown overlay={dashboardMenu} trigger={['click']}>
            <UserOutlined 
              style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} 
            />
          </Dropdown>
        )}
        {location.pathname === '/profile' && (
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <UserOutlined 
              style={{ fontSize: '24px', color: '#fff', cursor: 'pointer' }} 
            />
          </Dropdown>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
