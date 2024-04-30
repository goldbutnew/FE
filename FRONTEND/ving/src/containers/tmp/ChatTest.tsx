'use client'
import React from "react";
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const roomId = 1

// function onMessageReceived(message: StompJs.Message) {
//   console.log("씨이이이이이이")
// }



export default function ChatTest() {
  const client = useRef<any>({});
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState(''); // 입력 상태 추가가

  const onMessageReceived = (msg) => {
    const message = JSON.parse(msg.body);
    console.log("단일 메시지:", message)
    setMessages(prevMessages => [...prevMessages, message]);
    console.log("메시지 수신:", msg.body);  // 로그를 메시지 본문으로 변경
  }

  const subscribe = () => {
    client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived);
  };
  
  
  function Join() {
    const message = {
      code: 100,
      id: "myUserName",
    };
    client.current.publish({
      destination: `/sub/channel/${roomId}`,
      body: JSON.stringify(message),
    });
  }
  
  function Disconnect() {
    const message = {
      code: 101,
      id: "myUserName",
    };
    client.current.publish({
      destination: `/sub/channel/${roomId}`,
      body: JSON.stringify(message),
    });
  }

  const connect = () => {

    client.current = StompJs.Stomp.over(function () {
      return new SockJS(`http://localhost:8080/ws`);
    });

    client.current.onConnect = () => {
      subscribe();
      Join();
    };
    client.current.onDisconnect = () => {
      Disconnect();
    };
    client.current.activate();
  };
  
  
  
  useEffect(() => {
    console.log(
      "======================================================\n\
      ======================================================\n"
    )
    connect();
    console.log(
      "======================================================\n\
      ======================================================\n"
    )
  }, [])
  
  const handleInputChange = (event) => {
    setMessageInput(event.target.value); // 입력 값 상태 업데이트
  };

  const handleSendMessage = (e) => {
    e.preventDefault()
    console.log(`메시지 배열: ${messages}`)
    const message = {
      code: 200, // 예시 코드, 필요에 따라 수정
      id: "myUserName", // 예시 ID, 필요에 따라 수정
      message: messageInput // 입력된 메시지
    };
    client.current.publish({
      destination: `/pub/message`, // 메시지 발행 주소
      body: JSON.stringify(message),
    });
    setMessageInput(''); // 입력 값 초기화
  };

  return (
    <div>
      <div style={{ border: "1px solid black", minHeight: 200, }}>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.message}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={handleInputChange} // 입력 변화 감지
          placeholder="메시지를 입력하세요"
        />
        <button onClick={handleSendMessage}>전송</button> {/* 메시지 전송 */}
      </div>
    </div>
  );
}