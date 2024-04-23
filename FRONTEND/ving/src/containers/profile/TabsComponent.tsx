import React, { useState } from 'react'
import * as styles from './index.css'
import { ProfileTabComponent } from './ProfileTabComponent';

const TabsComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div>
      <ul className={styles.tabList}>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'home'} 
          onClick={() => setActiveTab('home')}
        >
          홈
        </li>
        <li 
          className={styles.tab} 
          data-active={activeTab === 'video'} 
          onClick={() => setActiveTab('video')}
        >
          동영상
        </li>
      </ul>
      <div className={styles.tabPanel}>
        {activeTab === 'home' && <ProfileTabComponent />}
        {activeTab === 'video' && <div>Video content...</div>}
      </div>
    </div>
  );
};

export default TabsComponent