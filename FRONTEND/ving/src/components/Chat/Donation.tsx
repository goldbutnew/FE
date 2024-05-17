'use client';

import React, { useState, useEffect } from 'react';
import BottomSheet from '../BottomSheet';
import { line } from '@/styles/common.css';
import EmojiPicker from 'emoji-picker-react';
import * as styles from './index.css';
import { bold } from '@/styles/fonts.css';
import SmallButton from '../Button/SmallButton';
import { vars } from '@/styles/vars.css';
import DefaultInput from '../Input/DefaultInput';
import ToggleButton from '../Button/ToggleButton';
import { betweenWrapper } from '@/styles/wrapper.css';
import useChatStore from '@/components/Chat/Store';
import useAuthStore from '@/store/AuthStore';
import useStreamingStore from '@/store/StreamingStore';
import useModal from '@/hooks/useModal';
import useProfileStore from '@/store/ProfileStore';
import { formatNumber } from '@/utils/formatNumber';

const speak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR'; // 한국어 설정
  synth.speak(utterance);
};

export default function Donation() {
  const { userData } = useAuthStore();
  const { getUserProfileInfo, profileData } = useProfileStore();
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { close, open, isOpen, modalRef } = useModal();
  const [choco, setChoco] = useState(0);
  const [isAnonym, setIsAnonym] = useState(false);
  const [isTTS, setIsTTS] = useState(false);
  const [initChoco, setInitChoco] = useState(0);
  const [warning, setWarning] = useState('');
  const [name, setName] = useState('');
  const { streamRoomData } = useStreamingStore();

  useEffect(() => {
    if (userData.nickname) {
      setName(userData.nickname);
    }
  }, [userData.nickname]);

  useEffect(() => {
    if (userData.username) {
      getUserProfileInfo(userData.username)
    }
  }, [getUserProfileInfo, userData.username])

  useEffect(() => {
    if (profileData.choco) {
      setInitChoco(profileData.choco);
    }
  }, [profileData.choco]);

  const sendChoco = (value) => () => {
    setChoco(value);
    console.log(`choco: ${value}`);
  };

  useEffect(() => {
    if (initChoco - choco < 0) {
      setWarning('초코가 부족합니다!');
    } else {
      setWarning('');
      setInitChoco(initChoco - choco);
    }
  }, [choco]);

  const handleAnonym = (newState) => {
    setIsAnonym(newState);
    if (newState) {
      setName('익명의 후원자');
    } else {
      setName(userData.nickname);
    }
  };

  const handleTTS = (newState) => {
    setIsTTS(newState);
  };

  const handleChange = (e) => {
    setMessageInput(e.target.value);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (e) => {
    const emoji = e.emoji;
    setMessageInput((prevMessage) => prevMessage + emoji);
  };

  const handleSendMessageWithChoco = async (e) => {
    console.log(streamRoomData);
    e.preventDefault();
    const donationRequest = {
      streamer: streamRoomData.username,
      nickname: name,
      choco: choco,
      isTts: isTTS,
      message: messageInput,
    };

    await useChatStore.getState().sendDonation(donationRequest);

    if (isTTS) {
      speak(messageInput); // 메시지 전송 시 TTS 호출
    }
    
    setMessageInput('');
    setChoco(0);
    close();
  };

  const formattedChoco = formatNumber(initChoco);

  return (
    <div>
      <SmallButton text="🍫" color={vars.colors.lightGray} onClick={open} />
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={close}>
          <div className={styles.topContainer}>
            <span className={bold}>후원</span>
            <hr className={line} />
            <p>🍫 보유 초코: {formattedChoco}초코</p>
            <hr className={line} />
            <div className={styles.selectedChocoBox}>
              <span>🍫</span>
              <input
                type="number"
                value={choco}
                onChange={(e) => setChoco(Number(e.target.value))}
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
            <div className={styles.warningBox}>{warning}</div>
            <hr className={line} />
            <div className={styles.toggleBox}>
              <div className={betweenWrapper}>
                채팅 읽어 주기
                <ToggleButton isActive={isTTS} onChange={handleTTS} />
              </div>
              <div className={betweenWrapper}>
                익명으로 후원하기
                <ToggleButton isActive={isAnonym} onChange={handleAnonym} />
              </div>
            </div>
            <hr className={line} />
            {showEmojiPicker && (
              <div className={styles.donationEmojiPicker}>
                <EmojiPicker
                  width="100%"
                  height={200}
                  searchDisabled={true}
                  previewConfig={{
                    defaultEmoji: '1f60a',
                    defaultCaption: "What's your mood?",
                    showPreview: false,
                  }}
                  onEmojiClick={handleEmojiClick}
                />
              </div>
            )}
            <div className={styles.donationInputBox}>
              <span className={styles.donatorName}>{name}</span>
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
