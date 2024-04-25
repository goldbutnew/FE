'use client'

import React, { ReactNode, useState } from 'react';
import * as styles from './index.css';
import { defaultBox } from '@/styles/box.css';
import { line } from '@/styles/common.css';
import { betweenBox, columnbox } from '@/styles/box.css';
import { LiaDoorOpenSolid, LiaDoorClosedSolid } from "react-icons/lia";

interface SidebarProps {
  title: string
  side: 'left' | 'right'
  initOpen: boolean
  width: number
  children?: React.ReactNode
}

// export default function SideBar({ title, side, content, isOpen, setIsOpen }: SidebarProps) {
export default function SideBar({ title, side, initOpen, width, children }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(initOpen);
  const positionStyle = side === 'left' ? `${styles.leftSidebar}` : `${styles.rightSidebar}`;

  const widthStyle = {
    width: isOpen ? width : '80px', // 열렸을 때는 받은 너비를 사용하고, 닫혔을 때는 100px을 사용
  };


  return (
    <div 
      className={isOpen ? `${positionStyle} ${styles.open}` : `${positionStyle} ${styles.close}`}
      style={widthStyle}
    >
      {isOpen ? 
        <div>
          {side === 'left' ? 
            <div className={betweenBox}>
              <span>{title}</span>
              <LiaDoorClosedSolid
                size={20}
                className={styles.toggleButton}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            : <div>
              <div className={betweenBox}>
                <LiaDoorClosedSolid
                  size={20}
                  className={styles.toggleButton}
                  onClick={() => setIsOpen(!isOpen)}
                />
                <span>{title}</span>                
              </div>              
            </div>
          }
        </div>
        : 
        <div className={columnbox}>
          <LiaDoorOpenSolid
            size={20}
            className={styles.toggleButton}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>        
      }
      <hr className={line} />
      <div className={styles.sidebarContent}>
        {children}
      </div>
    </div>
  );
}