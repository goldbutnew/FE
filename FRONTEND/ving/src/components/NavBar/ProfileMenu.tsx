'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import * as styles from './index.css'
import { FaUserCircle } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MenuItem from '../DropdownMenu/MenuItem';

export default function ProfileMenu({ onLogout }) {
  const userId = 1
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={styles.profileMenuContainer}>
      <button onClick={toggleMenu} className={styles.avatarButton}>
        {/* <IconButton icon={FaUserCircle} /> */}
        <FaUserCircle size={32} />
      </button>
      {isOpen && (
        <DropdownMenu>
          <MenuItem>
            <Link href={`/setting/${userId}`}>
              세팅
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={`/profile/${userId}`}>내 채널</Link>
          </MenuItem>
          <MenuItem onClick={onLogout}>로그아웃</MenuItem>
        </DropdownMenu>
      )}
    </div>
  );
}