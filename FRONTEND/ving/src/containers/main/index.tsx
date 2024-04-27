
'use client'

import { useState } from 'react';
import MainPage from './MainPage'
import Logout from '../auth/Logout'
import ToggleButton from '@/components/Button/ToggleButton'
import ChoiceChip from '@/components/Button/ChoiceChip';

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
        <ChoiceChip 
          label='감자'
        />
        <ChoiceChip 
          label='고구마'
        />
      </div>
    </div>
  )
}