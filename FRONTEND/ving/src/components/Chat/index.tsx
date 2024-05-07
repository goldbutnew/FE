'use client';

import React, { useState, useEffect, useRef } from "react"
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
import useAuthStore from "@/store/AuthStore";
import useChatStore from "@/store/ChatStore";
import { getFormattedTimestamp } from "@/utils/dateUtils";
import { style } from "@vanilla-extract/css";
import { line } from "@/styles/common.css";

interface Message {
  userName: string;
  nickname: string;
  timeStamp: string;
  donation : number;
  isTts : Boolean;
  text: string;
}

export default function Chat() {
  const { userData } = useAuthStore()
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [profileKey, setProfileKey] = useState(0)
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const messages = useChatStore(state => state.messages)
  const addMessage = useChatStore(state => state.addMessage)
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  
  const roomId = "a2FueWV3ZXN0";

  const onMessageReceived = (msg) => {
    const newMessage = JSON.parse(msg.body);
    console.log(newMessage);
  };

  const connect = () => {
    console.log("WebSocket 연결 시도 중...");
    const client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));

    client.reconnect_delay = 5000;
    client.debug = function(str) {
      console.log('STOMP Debug:', str);
    };

    client.onConnect = () => {
      console.log("연결 완료");
      setConnected(true);
      client.subscribe(`/sub/channel/${roomId}`, onMessageReceived, {
        id: `sub-${roomId}`,
        ack: 'client'
      });
    };

    client.onDisconnect = () => {
      console.log("WebSocket 연결 해제 완료");
      setConnected(false);
    };

    client.activate();
    setStompClient(client);
  };
  
  useEffect(() => {
    connect();
    return () => {
      if (stompClient) {
        console.log("WebSocket 연결 해제 시도 중...");
        stompClient.deactivate();
      }
    }
  }, []);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji) => {
    setMessageInput(prev => prev + emoji.emoji);
  }

  const handleSendMessage = (event) => {
    event.preventDefault()
    const formattedTimestamp = getFormattedTimestamp()

    if (stompClient && messageInput.trim() && connected) {
      const message : Message = {
        userName: userData.Id,
        nickname: userData.nickname,
        timeStamp: formattedTimestamp,
        donation : 0,
        isTts: false,
        text: messageInput,
      };
      stompClient.publish({
        destination: `/pub/channel/${roomId}`,
        body: JSON.stringify(message)
      });
      console.log("메시지 형식:", message)
      addMessage(message);
      setMessageInput('');
    } else {
      console.log("아직 소켓 연결 안 됨");
    }
  };

  useEffect(() => {
    // 스크롤 항상 아래로 내리기
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);


  const handleNicknameClick = (user) => {
    setSelectedUserData(user);
    setProfileOpen(true);
    setProfileKey(prevKey => prevKey + 1)
  };

  return (
    <SideBar title="채팅" side="right" initOpen={true} width={300} hidden={true}>
      <div className={styles.chatBox} ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={styles.chatItem}
          >
            {msg.donation ? 
              <div className={styles.donationChatItem}>
                <button className={styles.DontaionchatNickname} onClick={() => handleNicknameClick({ id: msg.senderId, nickname: msg.senderNickname })}>
                  {msg.nickname}
                </button>
                <div>{msg.text}</div>
                <hr className={line} />
                <div className={styles.donationChatItemChoco}>🍫 {msg.donation}</div>
              </div>
            : 
              <div>
                <button className={styles.chatNickname} onClick={() => handleNicknameClick({ id: msg.senderId, nickname: msg.senderNickname })}>
                  {msg.nickname}
                </button>: <span>{msg.text}</span>
              </div>
            }
          </div>
        ))}
      </div>
      <ChatProfile isOpen={profileOpen} onClose={() => setProfileOpen(false)} userData={selectedUserData} />
      <form className={styles.inputBox} onSubmit={handleSendMessage}>     
        <div className={styles.emojiBox}>
          {showEmojiPicker && (
            <EmojiPicker width="100%" height={300} onEmojiClick={handleEmojiClick} />
          )}
        </div>
        <DefaultInput 
          type="text"
          value={messageInput}
          onChange={handleChange}
          placeholder="채팅을 입력해 주세요"
          onEmojiClick={openEmojiPicker}
        />
      </form>
      <div className={styles.sendButtonBox}>
        <Donation />
        <SmallButton text="전송" color={vars.colors.darkGray} onClick={handleSendMessage} />
      </div>
    </SideBar>
  );
}
