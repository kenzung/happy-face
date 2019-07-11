import React from 'react';
import { NavBar } from 'antd-mobile';
import ImagePage from './pages/imageShow';
import MenuIcon from './assets/menu.png';
import './App.css';

function App() {
  return (
    <div>
      <NavBar
        className="main__tabbar"
        leftContent={<img src={MenuIcon} alt="menu-icon" style={{ height: '40px' }} />}
        mode="light"
      >
        首页
      </NavBar>
      <ImagePage />
    </div>
  );
}

export default App;
