'use client'

import React, { useState, useRef, useEffect } from 'react';
import * as styles from './index.css';

interface DropdownMenuProps {
  button: React.ReactNode;
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, button }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // 이벤트 리스너를 document에 추가
    document.addEventListener('mousedown', handleOutsideClick);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={menuRef}>
      <div onClick={toggleDropdown}>{button}</div>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {children}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
