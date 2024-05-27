// Navbar.js
import { useState } from 'react';
import { AudioOutlined, HomeOutlined, TeamOutlined, MailOutlined, ExperimentOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import router from 'next/router';

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
  },
  {
    label: 'FysiKI',
    key: '/fysi-ki',
    icon: <ExperimentOutlined />,
  },
  {
    label: 'Om oss',
    key: '/om-oss',
    icon: <TeamOutlined />,
  },
  {
    label: 'Kontakt oss',
    key: '/kontakt',
    icon: <MailOutlined />,
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('/');
  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  return (
    <>
      <Menu className="navBarMenu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    </>
  );
}

export default Navbar;
