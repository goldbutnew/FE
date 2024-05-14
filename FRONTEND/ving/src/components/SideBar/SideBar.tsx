'use client'

import React, { useState, useEffect } from 'react';
import * as styles from './index.css';
import { line } from '@/styles/common.css';
import { betweenWrapper, columnWrapper } from '@/styles/wrapper.css';
import { LiaDoorOpenSolid, LiaDoorClosedSolid } from "react-icons/lia";
import useProfileStore from '@/store/ProfileStore';

interface SidebarProps {
  title: string
  side: 'left' | 'right'
  width: number
  initOpen?: boolean
  hidden?: boolean
  children?: React.ReactNode
  onToggle?: () => void;
  isOpen?: boolean;
}

export default function SideBar({ title, side, isOpen, initOpen, width, hidden, children, onToggle }: SidebarProps) {
  const positionStyle = side === 'left' ? `${styles.leftSidebar}` : `${styles.rightSidebar}`;

  const toggleSidebar = () => {
    onToggle()
  };

  const widthStyle = {
    width: isOpen ? `${width}px` : (hidden ? '28px' : '68px'),
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
                  onClick={toggleSidebar}
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
              onClick={toggleSidebar}
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
