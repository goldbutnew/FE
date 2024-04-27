'use client';

import React, { useState, useEffect } from "react";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import SideBar from "../SideBar/SideBar";
import DefaultInput from "../Input/DefaultInput";
import SmallButton from "../Button/SmallButton";
import * as styles from "./index.css"
import { vars } from "@/styles/vars.css";
import EmojiPicker from "emoji-picker-react";
import ChatProfile from "./ChatProfile";
import Donation from "./Donation";

export default function Chat() {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  useEffect(() => {
    // WebSocket 연결 설정
    const socket = new SockJS('http://localhost:8080')
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/messages', (response) => {
        // 서버로부터 메시지 수신
        const newMessage = JSON.parse(response.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    setStompClient(client);

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      client.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value)
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (e) => {
    const emoji = e.emoji
    setMessage((prevMessage) => prevMessage + emoji)
  }  
  
  const handleSendMessage = () => {
    console.log(message);
    setMessage(''); // 메시지 전송 후 입력값 초기화
    if (stompClient && message) {
      stompClient.send('/app/send', {}, JSON.stringify({ message }));
      setMessage('');
    }
  };

  return (
    <SideBar 
      title="채팅" 
      side="right"
      initOpen={true}
      width={300}
      hidden={true}
    >
      <div className={styles.chatBox}>
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
        채팅창 테스트 줄바꿈 테스트 온갖 테스트테스트 테스트
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
  );
}
