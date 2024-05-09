'use client'

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import * as styles from './index.css';
import { line } from "@/styles/common.css";

export default function NewsFeed() {
  const [events, setEvents] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const [connected, setConnected] = useState(false);

  const roomId = "ZGhhYWtzbHFrc2FwZ2hh";

  useEffect(() => {
    const sock = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(sock);

    // stompClient.connect({}, frame => {
    //   console.log('Connected: ' + frame);

    //   stompClient.subscribe('/topic/newsFeed', message => {
    //     const newEvent = JSON.parse(message.body);
    //     setEvents(prevEvents => [...prevEvents, newEvent]);
    //   });
    // });
    
    // return () => {
    //   if (stompClient) {
    //     stompClient.disconnect(() => {
    //       console.log('Disconnected');
    //     });
    //   }
    // };
  }, []);

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
      client.subscribe(`/sub/streamer/${roomId}`, onMessageReceived, {
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

  return (
    // <div className={styles.newsFeedContainer}>
    //   <div className={styles.title}>
    //     뉴스피드
    //   </div>
    //   <hr className={line} />
    //   <div className={styles.newsFeedContent}>
    //     {events.map((event, index) => (
    //       <div key={index} className={styles.newfeedItem}>
    //         {event.isDonation === 0 && `🎉 ${event.user} 님이 팔로우했습니다.`}
    //         {event.isDonation !== 0 && `🍫 ${event.user} 님이 ${event.choco} 초코를 후원했습니다.`}
    //       </div>
    //     ))}
    //   </div>
    // </div>
    <div className={styles.newsFeedContainer}>
      <div className={styles.title}>
        뉴스피드
      </div>
      <hr className={line} />
      <div className={styles.newsFeedContent}>
        {events.map((event, index) => (
          <div key={index} className={styles.newfeedItem}>
            {event.isDonation === 0 && `🎉 ${event.user} 님이 팔로우했습니다.`}
            {event.isDonation !== 0 && `🍫 ${event.user} 님이 ${event.choco} 초코를 후원했습니다.`}
          </div>
        ))}
      </div>
    </div>
  );
}
