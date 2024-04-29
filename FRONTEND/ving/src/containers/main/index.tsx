
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
        <p>🍔이금현 테스트 중🍕</p>
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        어ㅏㄴㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
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
      
      <Logout />
    </div>
  )
}