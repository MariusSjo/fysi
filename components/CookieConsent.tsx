import React, { useState, useEffect } from 'react';
import { Button, Space } from 'antd';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <div className="cookie-text">
          <p>
            <strong>Vi bruker cookies</strong>
          </p>
          <p>
            Vi bruker Microsoft Clarity for å analysere hvordan nettsiden brukes og forbedre brukeropplevelsen. 
            Ingen personlige data lagres.
          </p>
        </div>
        <Space className="cookie-actions">
          <Button 
            type="primary" 
            icon={<CheckCircleOutlined />}
            onClick={handleAccept}
            size="large"
          >
            Aksepter
          </Button>
          <Button 
            icon={<CloseOutlined />}
            onClick={handleDecline}
            size="large"
          >
            Avslå
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default CookieConsent;
