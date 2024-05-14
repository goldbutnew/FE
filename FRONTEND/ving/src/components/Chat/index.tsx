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
import useChatStore from "@/components/Chat/Store";
import { getFormattedTimestamp } from "@/utils/dateUtils";
import { getRandomColor } from "./utils";
import { line } from "@/styles/common.css";
import useStreamingStore from "@/store/StreamingStore";
import useProfileStore from "@/store/ProfileStore";
import useModal from "@/hooks/useModal";


export default function Chat() {
  const { userData } = useAuthStore()
  const [connected, setConnected] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const { getChatProfile, selectedUserData, clearMessages } = useChatStore()
  const messages = useChatStore(state => state.messages)
  const addMessage = useChatStore(state => state.addMessage)
  const [messageInput, setMessageInput] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatBoxRef = useRef(null);
  const { streamRoomData } = useStreamingStore()
  const [nicknameColors, setNicknameColors] = useState(new Map());
  const { getStreamerProfileInfo, streamerProfileData } = useProfileStore()
  const [isFollowed, setIsFollowed] = useState(false)
  const { open, close, isOpen } = useModal()
  // const [stompSubscription, setStompSubscription] = useState<StompSubscription | null | void >(null)
  const stompSubscription  = useRef<StompSubscription | null>(null)
  const stompClient = useRef<CompatClient | null>(null)

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 10) + 70
    const lightness = Math.floor(Math.random() * 20) + 70
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
  }

  const getNicknameColor = (nickname: string) => {
    if (nicknameColors.has(nickname)) {
      return nicknameColors.get(nickname);
    } else {
      const newColor = getRandomColor(); // 랜덤 색상 생성 함수
      setNicknameColors(new Map(nicknameColors.set(nickname, newColor)));
      return newColor;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      await getStreamerProfileInfo(streamRoomData.username);
      setIsFollowed(streamerProfileData.isFollowed);
    };
  
    fetchProfile();
    
    const interval = setInterval(() => {
      fetchProfile();  // 30초마다 팔로우 상태를 갱신
    }, 30000);  // 초 단위 오류 수정 (300 -> 30000)
    
    return () => clearInterval(interval);
  }, [getStreamerProfileInfo, streamRoomData.username, streamerProfileData.isFollowed]);
  
  let roomId = btoa(streamRoomData.username);

  const onMessageReceived = (msg: string) => {
    const newMessage = JSON.parse(msg.body);
    console.log("Received new message:", newMessage); // 로그 추가
    addMessage(newMessage);
  };

  const connect = () => {
    if (connected) {
      console.log("이미 WebSocket에 연결되어 있습니다. 연결 상태:", connected);
      return; // 이미 연결된 경우 추가 연결 방지
    }  

    console.log("WebSocket 연결 시도 중...");
    const client = Stomp.over(() => new SockJS('http://localhost:8080/ws'));
    // const client = Stomp.over(() => new SockJS('http://k10a203.p.ssafy.io/ws'));

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
    stompClient.current = client;
    // setStompClient(client);
  };

  useEffect(() => {
    function unSub() {
      console.log("WebSocket 연결 해제 시도 중...");
      console.log(stompSubscription)
      if (stompSubscription.current !== null)
      {
        stompSubscription.current.unsubscribe()
      }
      else
      {
        console.log("사실 난 없는사람이야", stompSubscription.current)
      }
      if (stompClient.current) {
        // stompClient.unsubscribe(stompSubscription)
        console.log("WebSocket 연결 해제 시도 중...");
        stompClient.current.deactivate();
      }
    }
    
    connect();
    return () => {
      unSub()
      roomId = ""
    };
  }, [roomId]);

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const openEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji: any) => {
    setMessageInput(prev => prev + emoji.emoji);
  }

  const handleSendMessage = (event) => {
    event.preventDefault();
    const formattedTimestamp = getFormattedTimestamp();

  if (stompClient.current && messageInput.trim() && connected) {
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
  
    stompClient.current.publish({
      destination: `/pub/channel/${roomId}`,
      body: JSON.stringify(message)
    });
    console.log("메시지 형식:", message);
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
    <SideBar 
      title="채팅" 
      side="right" 
      isOpen={isSidebarOpen}
      initOpen={true} 
      width={300} 
      hidden={true}
      onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
    >
      <div className={styles.chatBox} ref={chatBoxRef}>
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
              height={300} 
              searchDisabled={true} 
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
          placeholder={isFollowed ? "채팅을 입력해 주세요" : "팔로워만 채팅 가능합니다."}
          disabled={!isFollowed}
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
