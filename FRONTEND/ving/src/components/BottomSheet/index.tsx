'use client'

import React, { useState, useEffect } from 'react';
import * as styles from './index.css';
import { IoIosClose } from 'react-icons/io';
import { endBox } from '@/styles/box.css';
import { plainButton } from '@/styles/common.css';

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
      onClick={handleClose}
    >
      <div className={`${plainButton} ${endBox}`}>
        <IoIosClose
          size={20} 
        />
      </div>
      {children}
    </div>
  );
}
