import React from 'react';
import Link from 'next/link';
import * as styles from './index.css'
import { FaUserCircle } from 'react-icons/fa';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import MenuItem from '../DropdownMenu/MenuItem';
import Logout from '@/containers/auth/Logout';

import useAuthStore from '@/store/AuthStore'
import useProfileStore from '@/store/ProfileStore';

export default function ProfileMenu({ onLogout }) {
  const { userData } = useAuthStore()
  const { profileUserName, getUserProfileInfo } = useProfileStore()
  const username = btoa(userData.username)

  const handleMyChannel = () => {
    getUserProfileInfo(userData.username)
    console.log(userData.username)
  }

  return (
    <div className={styles.profileMenuContainer}>
      <DropdownMenu 
        button={<button className={styles.avatarButton}><FaUserCircle size={32} /></button>}>
        <MenuItem>
          <Link href={`/setting/${username}`}>세팅</Link>
        </MenuItem>
        <MenuItem>
          <Link href={`/profile/${username}`} onClick={() => handleMyChannel()}>내 채널</Link>
        </MenuItem>
        <MenuItem>
          <Logout onLogoutSuccess={onLogout} />
        </MenuItem>
      </DropdownMenu>
    </div>
  );
}