'use client'

import React from 'react';
import * as styles from './index.css';
import useModal from '@/hooks/useModal';

interface DropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
  position?: 'right' | 'left';
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, button, position }) => {
  const { isOpen, open, modalRef } = useModal();

  return (
    <div ref={modalRef} className={styles.dropdownMenuConatiner}>
      <div onClick={open} className={styles.dropdownButton}>{button}</div>
      {isOpen && (
        <div className={`${position === "left" ? styles.dropdownMenuLeft : styles.dropdownMenuRight}`}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
