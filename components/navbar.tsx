import { useState } from 'react';
import { AudioOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import router from 'next/router';
// Navbar.js

const items: MenuProps['items'] = [
  {
    label: 'Hjem',
    key: '/',
    icon: <HomeOutlined />,
  },
  {
    label: 'Arkiv',
    key: '/arkiv',
    icon: <AudioOutlined />,
  }
];

const Navbar = () => {
  const [current, setCurrent] = useState('/');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    router.push(e.key)
  };

  return (
    <>
      <Menu className="navBarMenu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </>
  )
}

export default Navbar;