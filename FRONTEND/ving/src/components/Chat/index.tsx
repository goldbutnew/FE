'use client';

import React, { useState, useEffect } from "react"
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import SideBar from "../SideBar/SideBar"
import DefaultInput from "../Input/DefaultInput"
import SmallButton from "../Button/SmallButton"
import * as styles from "./index.css"
import { vars } from "@/styles/vars.css"
import EmojiPicker from "emoji-picker-react"
import ChatProfile from "./ChatProfile"
import Donation from "./Donation"

export default function Chat() {
  const [stompClient, setStompClient] = useState(null)
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  
  const connect = () => {
    console.log("WebSocket 연결 시도 중...");
    const socketFactory = () => {
      return new SockJS('http://localhost:8080/');
    };
  
    console.log("STOMP 클라이언트 생성 중...");
    const client = Stomp.over(socketFactory);
  
    // 모든 STOMP 프레임 로깅 활성화
    client.debug = function(str) {
      console.log('STOMP Debug:', str);
    };
  
    console.log("STOMP 연결 시도 중...");
    client.connect({}, () => {
      console.log("연결 완료");
      setConnected(true);
  
      console.log("메시지 구독 중...");
      client.subscribe('/sub/channel/', (response) => {
        console.log("메시지 수신:", response.body);
        const newMessage = JSON.parse(response.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }, (error) => {
      console.error('Connection error:', error);
      setConnected(false);
    });
  
    // WebSocket 이벤트에 대한 로그 추가
    socketFactory.onopen = () => console.log("WebSocket 연결 성공");
    socketFactory.onclose = () => console.log("WebSocket 연결 종료");
    socketFactory.onerror = (error) => console.log("WebSocket 오류:", error);
  
    setStompClient(client);
  };
  
  useEffect(() => {
    connect()
  
    return () => {
      if (stompClient) {
        console.log("WebSocket 연결 해제 시도 중...");
        stompClient.disconnect(() => {
          console.log("WebSocket 연결 해제 완료");
        });
      }
    }
  }, []);
  
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e) => {
    const emoji = e.emoji
    setMessage(prevMessage => prevMessage + emoji)
  }

  const handleSendMessage = () => {
    console.log("보낼 메시지 내용:", message)
    if (stompClient && message && connected) { 
      stompClient.send('/pub/message', {}, JSON.stringify({ message }))
      setMessage('')
    } else {
      console.log("아직 소켓 연결 안 됨")
    }
  }

  return (
    <SideBar 
      title="채팅" 
      side="right"
      initOpen={true}
      width={300}
      hidden={true}
    >
      <div className={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index}>{msg.message}</div>
        ))}
      </div>
      <ChatProfile />
      {showEmojiPicker && (
        <div className={styles.emojiPicker}>
          <EmojiPicker
            width="100%"
            height={300}
            onEmojiClick={handleEmojiClick}
          />
        </div>
      )}
      <div className={styles.InputBox}>
        <DefaultInput 
          type="text"
          value={message} 
          onEmojiClick={openEmojiPicker}
          onChange={handleChange}
          placeholder="채팅을 입력해 주세요"
        />
        <div className={styles.sendButtonBox}>
          <Donation />
          <SmallButton 
            text="전송"
            color={vars.colors.darkGray}
            onClick={handleSendMessage}
          />  
        </div>
      </div>
    </SideBar>
  )
}
