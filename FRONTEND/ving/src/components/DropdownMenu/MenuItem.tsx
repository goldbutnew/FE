import React from 'react';
import * as styles from './index.css'; // 스타일 파일

interface MenuItemProps {
  onClick?: () => void
  children?: React.ReactNode
}

const MenuItem = ({ children, onClick }: MenuItemProps) => {
  return (
    <button className={styles.dropdownItem} onClick={onClick}>
      {children}
    </button>
  );
}

export default MenuItem;
