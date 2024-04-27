
'use client'

import { useState } from 'react';
import MainPage from './MainPage'
import Logout from '../auth/Logout'
import ToggleButton from '@/components/Button/ToggleButton'

export default function Main() {
  const [isActive, setIsActive] = useState(false)

  const handleToggle = (newState: boolean) => {
    setIsActive(newState);
  };

  return (
    <div>
      <div>
        <MainPage />  
        <ToggleButton 
          isActive={isActive}
          onChange={handleToggle}
        />     
      </div>
      {/* <Logout /> */}
    </div>
  )
}