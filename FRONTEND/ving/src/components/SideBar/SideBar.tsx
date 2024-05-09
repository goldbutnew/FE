'use client'

import React, { useState } from 'react';
import * as styles from './index.css';
import { line } from '@/styles/common.css';
import { betweenWrapper, columnWrapper } from '@/styles/wrapper.css';
import { LiaDoorOpenSolid, LiaDoorClosedSolid } from "react-icons/lia";
import RankingUser from './RankingUser';

interface SidebarProps {
  title: string
  side: 'left' | 'right'
  initOpen?: boolean
  width: number
  hidden?: boolean
  children?: React.ReactNode
}

export default function SideBar({ title, side, initOpen, width, hidden, children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const positionStyle = side === 'left' ? `${styles.leftSidebar}` : `${styles.rightSidebar}`;

  // 사이드바 너비 스타일 동적 생성
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
                  onClick={() => setIsOpen(!isOpen)}
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
              onClick={() => setIsOpen(!isOpen)}
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
          </div>
        )}     
    </div>
  );
}