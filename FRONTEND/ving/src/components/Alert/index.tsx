import React, { useState } from 'react';
import * as styles from './index.css';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`${styles.alertContainer} ${styles.alertThemeVars[type]}`}>
      <span className={styles.alertText}>{message}</span>
      <button className={styles.alertButton} onClick={handleClose}>
        &times;
      </button>
    </div>
  );
};

export default Alert;
