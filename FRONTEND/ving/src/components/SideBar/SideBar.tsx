 'use client'

import React, { useState } from 'react';
import * as styles from './index.css';
import { line } from '@/styles/common.css';
import { betweenWrapper, columnWrapper } from '@/styles/wrapper.css';
import { LiaDoorOpenSolid, LiaDoorClosedSolid } from "react-icons/lia";
import useProfileStore from '@/store/ProfileStore';

interface SidebarProps {
  title: string
  side: 'left' | 'right'
  initOpen?: boolean
  width: number
  hidden?: boolean
  children?: React.ReactNode
  onToggle?: () => void;
}

export default function SideBar({ title, side, initOpen, width, hidden, children, onToggle }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const positionStyle = side === 'left' ? `${styles.leftSidebar}` : `${styles.rightSidebar}`;

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
    onToggle?.();  // 부모 컴포넌트에 상태 변화를 알림
  };

  const widthStyle = {
    width: isOpen ? `${width}px` : (hidden ? '30px' : '80px'),
  };

  return (
    <div>
      {isOpen ? 
        <div 
          className={`${positionStyle} ${styles.open}`}
          style={widthStyle}>
          {side === 'left' ? 
            <div>
              <div className={betweenWrapper}>
                <span className={styles.sidebarTitle}>
                  {title}
                  </span>
                <LiaDoorClosedSolid
                  size={20}
                  className={styles.toggleButton}
                  onClick={toggleSidebar}
                />
              </div>
            </div>
            : 
            <div>
              <div className={betweenWrapper}>
                <LiaDoorClosedSolid
                  size={20}
                  className={styles.toggleButton}
                  onClick={() => setIsOpen(!isOpen)}
                />
                <span className={styles.sidebarTitle}>
                  {title}
                </span>                
              </div>
            </div>
          }              
          <hr className={line} />     
          <div className={styles.sidebarContent}>
            {children}
          </div>              
        </div>
        : 
        hidden ? (
          <div 
            className={`${positionStyle} ${styles.hidden}`}
            style={widthStyle}
          >
            <LiaDoorOpenSolid
              size={20}
              className={styles.toggleButton}
              onClick={toggleSidebar}
            />
          </div>
        ) : (
          <div 
            className={`${positionStyle} ${styles.close}`}
            style={widthStyle}
          >
            <LiaDoorOpenSolid
              size={20}
              className={styles.toggleButton}
              onClick={() => setIsOpen(!isOpen)}
            />
            <hr className={line} width="100%" /> 
            <div className={styles.sidebarContent}>
            {children}
            </div>    
          </div>
        )}     
    </div>
  );
}