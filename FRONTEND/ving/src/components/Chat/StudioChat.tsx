'use client';

import React, { useState, useEffect, useRef } from "react"
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import DefaultInput from "../Input/DefaultInput"
import SmallButton from "../Button/SmallButton"
import * as styles from "./index.css"
import { vars } from "@/styles/vars.css"
import EmojiPicker from "emoji-picker-react"
import useAuthStore from "@/store/AuthStore";
import { getRandomColor } from "./utils";
import useChatStore from "@/components/Chat/Store";
import { getFormattedTimestamp } from "@/utils/dateUtils";
import { line } from "@/styles/common.css";
import useStreamingStore from "@/store/StreamingStore";
import ChatProfile from "./ChatProfile";
import useModal from "@/hooks/useModal";

interface Message {
  userName: string;
  nickname: string;
  timeStamp: string;
  donation : number;
  isTts : Boolean;
  text: string;
}

export default function StudioChat() {
  const { userData } = useAuthStore()
  const { streamRoomData } = useStreamingStore()
  const { getChatProfile, selectedUserData } = useChatStore()
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);
  const messages = useChatStore(state => state.messages)
  const addMessage = useChatStore(state => state.addMessage)
  const [nicknameColors, setNicknameColors] = useState(new Map());
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const { open, close, isOpen } = useModal()
  
  const roomId = btoa(userData.username);

  const getNicknameColor = (nickname: string) => {
    if (nicknameColors.has(nickname)) {
      return nicknameColors.get(nickname);
    } else {
      const newColor = getRandomColor(); // 랜덤 색상 생성 함수
      setNicknameColors(new Map(nicknameColors.set(nickname, newColor)));
      return newColor;
    }
  };

  const onMessageReceived = (msg) => {
    const newMessage = JSON.parse(msg.body);
    console.log(newMessage);
    addMessage(newMessage);
  };

  const connect = () => {
    console.log("WebSocket 연결 시도 중...");
    const client = Stomp.over(() => new SockJS('http://k10a203.p.ssafy.io/ws'));

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
    // const color = getRandomColor()
    const message = {
      userName: userData.username,
      nickname: userData.nickname,
      timeStamp: formattedTimestamp,
      donation: 0,
      isTts: false,
      text: messageInput,
      // color: color
    };
      stompClient.publish({
        destination: `/pub/channel/${roomId}`,
        body: JSON.stringify(message)
      });
      console.log("메시지 형식:", message)
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


  const handleNicknameClick = async (user: string) => {
    const streamer = streamRoomData.username;
    const viewer = user;
    try {
      const profileData = await getChatProfile(streamer, viewer);
      if (profileData) {
        console.log("내 프로필 정보", profileData);  // 데이터 확인
        open();  // 모달 열기
      } else {
        console.log("프로필 데이터가 없습니다.");
      }
    } catch (error) {
      console.error("프로필 정보 가져오기 실패", error);
    }
  };


  return (
    <div className={styles.studioChatContainer}>
      <div className={styles.title}>
        채팅
      </div>
      <hr className={line} />
      <div className={styles.studioChatContent}>
        <div className={styles.studioChatBox} ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={styles.chatItem}
            >
              {msg.donation ? 
                <div className={styles.donationChatItem}>
                <button 
                  style={{ color: getNicknameColor(msg.userName) }}
                  className={styles.dontaionChatNickname}
                  onClick={msg.nickname !== "익명의 후원자" ? () => handleNicknameClick(msg.userName) : undefined}
                >
                  {msg.nickname}
                </button>
                <div>{msg.text}</div>
                <hr className={line} />
                <div className={styles.donationChatItemChoco}>🍫 {msg.donation}</div>
              </div>
              : 
              <div>
                <button
                  style={{ color: getNicknameColor(msg.nickname) }}
                  className={styles.chatNickname}
                  onClick={() => handleNicknameClick(msg.userName)}
                >
                  {streamRoomData.username === msg.userName ? "👑 " : ""}{msg.nickname}
                </button>: <span>{msg.text}</span>
              </div>
              }
            </div>
          ))}
        </div>
        <ChatProfile 
          isOpen={isOpen} 
          onClose={close} 
          userData={selectedUserData} 
        />
        <form className={styles.inputBox} onSubmit={handleSendMessage}>     
          <div className={styles.emojiBox}>
            {showEmojiPicker && (
              <EmojiPicker 
                width="100%" 
                searchDisabled={true} 
                height={180} 
                previewConfig={{
                  defaultEmoji: "1f60a",
                  defaultCaption: "What's your mood?",
                  showPreview: false
                }}
              onEmojiClick={handleEmojiClick} 
            />
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
        <div className={styles.studioChatSendButtonBox}>
          <SmallButton text="전송" color={vars.colors.darkGray} onClick={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
