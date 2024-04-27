'use client';

import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import DefaultInput from "../Input/DefaultInput";
import SmallButton from "../Button/SmallButton";
import * as styles from "./index.css"
import { vars } from "@/styles/vars.css";
import EmojiPicker from "emoji-picker-react";
import ChatProfile from "./ChatProfile";
import Donation from "./Donation";

export default function Chat() {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

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
