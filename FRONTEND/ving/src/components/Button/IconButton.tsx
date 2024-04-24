import React from 'react';

import * as styles from './index.css'


type ButtonProps = {
  icon: any;
  onClick?: () => void;
};

export default function IconButton({ icon, onClick }: ButtonProps) {
  const Icon = icon;
  
  return (
    <button 
      className={styles.iconButton}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}
