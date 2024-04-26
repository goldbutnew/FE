'use client'

import React, { useState, useEffect } from 'react';
import * as styles from './index.css';

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
    setTimeout(onClose, 300); // 애니메이션 시간에 맞춰서 onClose 호출
  };

  return (
    <div
      className={`${styles.bottomSheet} ${!isVisible && styles.slideOut}`}
      onClick={handleClose}
    >
      {children}
    </div>
  );
}
