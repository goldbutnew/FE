import React from 'react';
import * as styles from './index.css';

interface DropdownMenuProps {
  children?: React.ReactNode
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return (
    <div className={styles.dropdownMenu}>
      {children}
    </div>
  );
}

export default DropdownMenu;
