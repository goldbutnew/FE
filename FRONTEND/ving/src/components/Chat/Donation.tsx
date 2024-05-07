'use client'

import React, { useState, useEffect } from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import EmojiPicker from "emoji-picker-react";
import * as styles from './index.css'
import { bold } from "@/styles/fonts.css";
import SmallButton from "../Button/SmallButton";
import { vars } from "@/styles/vars.css";
import DefaultInput from "../Input/DefaultInput";
import ToggleButton from "../Button/ToggleButton";
import { betweenBox } from "@/styles/box.css";
import useChatStore from "@/store/ChatStore";
import useAuthStore from "@/store/AuthStore";
import { getFormattedTimestamp } from "@/utils/dateUtils";
// import axios from "axios";
import axios from '../../api/axios'
export default function Donation() {
  const { userData } = useAuthStore()
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [choco, setChoco] = useState(0)
  const [isAnonym, setIsAnonym] = useState(false)
  const [isTTS, setIsTTS] = useState(false)
  const initChoco = 3000000
  const [dummyChoco, setDummyChoco] = useState(initChoco)
  const [warning, setWarning] = useState('')
  const addMessage = useChatStore(state => state.addMessage)
  const [name, setName] = useState('')
  
  useEffect(() => {
    if (userData.nickname) {
      setName(userData.nickname);
    }
  }, [userData.nickname]);

  const sendChoco = (value) => () => {
    setChoco(value);
    console.log(`choco: ${value}`);
  };

  useEffect(() => {
    if ((initChoco - choco) < 0) {
      setWarning("초코가 부족합니다!")
    } else {
      setWarning("")
      setDummyChoco(initChoco - choco)
    }
  }, [choco]);

  const handleAnonym = (newState: boolean) => {
    setIsAnonym(newState);
    if (newState) {
      setName("익명의 후원자")
    } else {
      setName(userData.nickname)
    }
  };

  const handleTTS = (newState: boolean) => {
    setIsTTS(newState);
  };

  const handleChange = (e) => {
    setMessageInput(e.target.value)
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (e) => {
    const emoji = e.emoji
    setMessageInput((prevMessage) => prevMessage + emoji)
  }  

  const handleSendMessageWithChoco = (e) => {
    e.preventDefault()
    const formattedTimestamp = getFormattedTimestamp()

    const message = {
      userName: userData.Id,
      nickname: name,
      timestamp: formattedTimestamp,
      donation : choco,
      isTts: isTTS,
      text: messageInput,
    };

    interface DonationRequest {
      username: string;
      choco: number;
      isTts: boolean;
      message: string;
    }
    
    const donationRequest : DonationRequest = 
    {
      username: "kanyewest",
      choco : Number(choco),
      isTts: isTTS,
      message: messageInput
    } 
    const doDonations = async (donationData: DonationRequest) => {
      console.log("도네이션 데이터", donationData)
      const token = localStorage.getItem('accessToken')
      if (!token) {
        console.error('Access token is missing');
        return;
      }
      try {
        const response = await axios.patch(`sub/donation`, donationData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data
      {
        console.log(message)
      }
      } catch (error) {
        console.error(error)
      }
    }

    doDonations(donationRequest).then((msg) => {
      console.log(msg)
    })
    console.log("메시지 형식:", message)
    addMessage(message);
    setMessageInput('');
  };

  return (
    <div>
      <SmallButton
        text="🍫" 
        color={vars.colors.lightGray}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className={styles.topContainer}>
            <span className={bold}>후원</span>
            <hr className={line}/>
            <p>🍫 내 초코: {dummyChoco}</p>
            <hr className={line}/>
            <div className={styles.selectedChocoBox}>
              <span>🍫</span>
              <input
                type="number"
                value={choco}
                onChange={(e) => setChoco(e.target.value)}
                placeholder="초코를 입력하세요"
                className={styles.chocoInputBox}
              />
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
            <div className={styles.warningBox}>
              {warning}
            </div>
            <hr className={line} />
            <div className={styles.toggleBox}>
              <div className={betweenBox}>
                채팅 읽어 주기
                <ToggleButton
                  isActive={isTTS}
                  onChange={handleTTS}
                />
              </div>
              <div className={betweenBox}>
                익명으로 후원하기
                <ToggleButton
                  isActive={isAnonym}
                  onChange={handleAnonym}
                />
              </div>
            </div>
            <hr className={line}/>
            {showEmojiPicker && (
              <div className={styles.donationEmojiPicker}>
                <EmojiPicker
                  width="100%"
                  height={200}
                  searchDisabled={true} 
                  previewConfig={{
                    defaultEmoji: "1f60a",
                    defaultCaption: "What's your mood?",
                    showPreview: false
                  }}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <div className={styles.donationInputBox}>
              <span className={styles.donatorName}>
                {name}
              </span>
              <DefaultInput 
                  type="text"
                  value={messageInput} 
                  onEmojiClick={openEmojiPicker}
                  onChange={handleChange}
                  placeholder="채팅을 입력해 주세요"
                />
            </div>
            <div className={styles.donationSendButtonBox}>
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