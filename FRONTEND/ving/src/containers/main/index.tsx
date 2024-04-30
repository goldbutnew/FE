
'use client'

import { useState } from 'react';
import MainPage from './MainPage'
import ChoiceChip from '@/components/Button/ChoiceChip';

export default function Main() {

  return (
    <div>
      <div>
        <MainPage />  
        <p>🍔이금현 테스트 중🍕</p>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.          
        </p>
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