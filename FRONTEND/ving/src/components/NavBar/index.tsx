'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from 'next/link';

import Notifer from "../Notifer";
import Signup from "@/containers/auth/Signup";
import Login from "@/containers/auth/Login";
import Logout from "@/containers/auth/Logout";

import logo from '#/images/main-logo.png'
import * as styles from './index.css'


export default function NavBar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = 1

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };
  
  // 로그아웃 처리 함수
  const handleLogoutSuccess = () => {
    setIsAuthenticated(false);
  };

  
  return (
    <nav className={styles.container}>
      <div className={styles.leftNavBox}>
        <Link href='/'>
          <Image src={logo} alt="main" className={styles.logo} />
        </Link>
        <Link href='/setting'>세팅</Link>
        <Link href={`/profile/${userId}`}>내 채널</Link>
        <Link href={`/studio/${userId}`}>내 스튜디오</Link>
        <Link href={`/streaming/${userId}`}>방송중인 누군가의 방</Link> 
        <Link href={`/tmp`}>채팅 테스트</Link>
      </div>
      <div className={styles.rightNavBox}>
      {isAuthenticated ? (
        <>
          <Notifer />
          <Logout onLogoutSuccess={handleLogoutSuccess} />
        </>
      ) : (
        <>
          <Login onLoginSuccess={handleLoginSuccess} />
          <Signup />
        </>
      )}
      </div>
    </nav>
  )
}