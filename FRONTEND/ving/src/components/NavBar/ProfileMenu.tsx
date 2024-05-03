'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import * as styles from './index.css'
import { FaUserCircle } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MenuItem from '../DropdownMenu/MenuItem';

import useAuthStore from '@/store/AuthStore'

export default function ProfileMenu({ onLogout }) {
  const { userData } = useAuthStore()
  const username = btoa(userData.username)

  return (
    <div className={styles.profileMenuContainer}>
      <DropdownMenu 
        button={<button className={styles.avatarButton}><FaUserCircle size={32} /></button>}>
        <MenuItem>
          <Link href={`/setting/${username}`}>세팅</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/profile/${username}`}>내 채널</Link>
        </MenuItem>
        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
      </DropdownMenu>
    </div>
  );
}