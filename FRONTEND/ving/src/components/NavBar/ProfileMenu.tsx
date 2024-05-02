'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import * as styles from './index.css'
import { FaUserCircle } from 'react-icons/fa';

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
        <div className={styles.dropdownMenu}>
          <Link href="/setting" className={styles.dropdownItem}>
            세팅
          </Link>
          <Link href={`/profile/${userId}`} className={styles.dropdownItem}>
            내 채널
          </Link>
          <button onClick={onLogout} className={styles.dropdownItem}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}