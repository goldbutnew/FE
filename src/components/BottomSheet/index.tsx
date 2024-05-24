'use client'

import React, { useState, useEffect } from 'react';
import * as styles from './index.css';
import { IoIosClose } from 'react-icons/io';
import useModal from '@/hooks/useModal';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const [isVisible, setIsVisible] = useState(isOpen);
  
  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300)
  };

  return (
    <div
      className={`${styles.bottomSheet} ${!isVisible && styles.slideOut}`}
    >
      <div className={styles.closeButtonBox}>
        <IoIosClose
          size={20}
          onClick={handleClose} 
        />
      </div>
      {children}
    </div>
  );
}
