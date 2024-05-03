import React from 'react';
import * as styles from './index.css';
import useModal from '@/hooks/useModal';

interface DropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, button }) => {
  const { isOpen, open, modalRef } = useModal();

  return (
    <div ref={modalRef}>
      <div onClick={open}>{button}</div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
