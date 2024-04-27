'use client'

import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import EmojiPicker from "emoji-picker-react";
import * as styles from './index.css'
import { bold } from "@/styles/fonts.css";
import SmallButton from "../Button/SmallButton";
import { vars } from "@/styles/vars.css";
import DefaultInput from "../Input/DefaultInput";

export default function Donation() {
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [choco, setChoco] = useState(0)

  const sendChoco = (value) => () => {
    setChoco(value);
    console.log(`choco: ${choco}`)
  };

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
  
  const handleSendMessageWithChoco = () => {
    console.log(message);
    setMessage(''); // 메시지 전송 후 입력값 초기화
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>후원 test</button>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={styles.topContainer}>
            <span className={bold}>후원</span>
            <hr className={line}/>
            <p>🍫 내 초코: {choco}</p>
            <hr className={line}/>
            <div className={styles.selectedChocoBox}>
              <span>🍫 {choco}</span>
            </div>
            <div className={styles.buttonGroup}>
              <SmallButton
                text="1,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(1000)}   
              />
              <SmallButton 
                text="5,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(5000)}  
              />
              <SmallButton
                text="10,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(10000)}    
              />
              <SmallButton
                text="50,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(50000)}   
              />
            </div>
            <hr className={line} />
            <div>
              <div>채팅 읽어 주기</div>
              <div>익명으로 후원하기</div>
            </div>
            <hr className={line}/>
            {showEmojiPicker && (
              <div className={styles.donationEmojiPicker}>
                <EmojiPicker
                  width="100%"
                  height={200}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <div className={styles.donationInputBox}>
              <span className={styles.donatorName}>익명의 후원자</span>
              <DefaultInput 
                  type="text"
                  value={message} 
                  onEmojiClick={openEmojiPicker}
                  onChange={handleChange}
                  placeholder="채팅을 입력해 주세요"
                />
            </div>
            <div className={styles.sendButtonBox}>
              <SmallButton 
                text="전송"
                color={vars.colors.gray}
                onClick={handleSendMessageWithChoco}
              />  
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}