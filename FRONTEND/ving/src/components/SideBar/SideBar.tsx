import React, { ReactNode, useState } from 'react';
import * as styles from './index.css';
import { defaultBox } from '@/styles/box.css';
import { line } from '@/styles/common.css';
import { betweenBox, columnbox } from '@/styles/box.css';

interface SidebarProps {
  title: string,
  side: 'left' | 'right';
  content: ReactNode;
}

export default function SideBar({ title, side, content }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const positionStyle = side === 'left' ? `${styles.leftSidebar}` : `${styles.rightSidebar}`;

  return (
    <div className={isOpen ? `${positionStyle} ${styles.open}` : `${positionStyle} ${styles.close}`}>
      {isOpen ? 
        <div>
          {side === 'left' ? 
            <div className={betweenBox}>
              <span>{title}</span>
              <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                Close
              </button>                
            </div>
            : <div>
              <div className={betweenBox}>
                <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
                  Close
                </button>
                <span>{title}</span>                
              </div>              
            </div>
          }
        </div>
        : 
        <div className={columnbox}>
          <button className={styles.toggleButton} onClick={() => setIsOpen(!isOpen)}>
            Open
          </button>
        </div>        
      }
      <hr className={line} />
      <div>
        {content}
      </div>
    </div>
  );
}