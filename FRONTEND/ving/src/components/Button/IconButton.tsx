import React from 'react';

import * as styles from './index.css'

export default function IconButton({ icon }) {
  const Icon = icon;
  
  return (
    <button className={styles.iconButton} >
      <Icon />
    </button>
  );
}
