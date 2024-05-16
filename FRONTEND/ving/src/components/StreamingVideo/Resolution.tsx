import React, { CSSProperties } from 'react';
import * as styles from './index.css';
import useModal from '@/hooks/useModal';

interface DropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
  top?: boolean;
  style?: CSSProperties;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, button, top, style }) => {
  const { isOpen, open, modalRef } = useModal();

  return (
    <div ref={modalRef}>
      <div onClick={open}>{button}</div>
      {isOpen && (
        <div className={top ? styles.dropdownMenuTop : styles.dropdownMenu} style={style}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;