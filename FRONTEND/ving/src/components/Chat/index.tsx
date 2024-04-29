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
    const socket = new WebSocket('ws://localhost:8080')
    const client = Stomp.over(socket);

    client.debug = function(str) {
      console.log('STOMP Debug:', str);
    };
    
    client.reconnect_delay = 5000

    client.connect({}, () => {
      console.log("Connected successfully");
      setConnected(true);
  
      // 구독 설정
      client.subscribe('/topic/messages', (response) => {
        console.log("Message received");
        const newMessage = JSON.parse(response.body);
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });
    }, (error) => {
      console.error('Connection error:', error);
      setConnected(false);
    });
  
    // Stomp 클라이언트 상태 업데이트
    setStompClient(client);
  };
  useEffect(() => {
    connect()

    return () => {
      if (stompClient) {
        stompClient.disconnect()
      }
    }
  }, [])

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
      stompClient.send('/app/send', {}, JSON.stringify({ message }))
      setMessage('')
    } else {
      console.log("아직 연결 중!")
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
