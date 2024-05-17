'use client'

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import * as styles from './index.css'
import { line } from "@/styles/common.css";
import useAuthStore from '@/store/AuthStore';

interface Event {
  isDonation: boolean;
  username: string;
  nickname: string;
  choco: number;
}

export default function NewsFeed() {
  const { userData } = useAuthStore()
  const [events, setEvents] = useState<Event[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

  const roomId = btoa(userData.username);

  const onMessageReceived = (msg: string) => {
    const event: Event = JSON.parse(msg.body);
    setEvents(prevEvents => [...prevEvents, event]);
    console.log("Event received:", event);
  };

  const connect = () => {
    const socket = new SockJS('https://k10a203.p.ssafy.io/ws');
    const client = Stomp.over(socket);

    client.reconnect_delay = 5000;
    client.debug = (str) => {
      console.log('STOMP Debug:', str);
    };

    client.onConnect = () => {
      console.log("뉴스피드 WebSocket 연결 완료");
      client.subscribe(`/sub/streamer/${roomId}`, onMessageReceived, {
        id: `sub-${roomId}`,
        ack: 'client'
      });
    };

    client.onDisconnect = () => {
      console.log("WebSocket 연결 해제 완료");
    };

    client.activate();
    setStompClient(client);
  };

  useEffect(() => {
    connect();
    return () => {
      stompClient?.deactivate();
      console.log("WebSocket 연결 해제 시도 중...");
    };
  }, []);

  return (
    <div className={styles.newsFeedContainer}>
      <div className={styles.title}>뉴스피드</div>
      <hr className={line} />
      <div className={styles.newsFeedContent}>
      {/* <div className={styles.newfeedItemBox}>🎉 <span className={styles.newfeedItemNickname}>바보</span> 님이 팔로우했습니다.</div>
      <div className={styles.newfeedItemBox}>🎉 <span className={styles.newfeedItemNickname}>바보</span> 님이 팔로우했습니다.</div>
      <div className={styles.newfeedItemBox}>🍫 <span className={styles.newfeedItemNickname}>sdfsfsfdsfdsfsf보</span> 님이 <span className={styles.newfeedItemNickname}>10399348892398398234 초코</span>를 후원했습니다.</div> */}
        {events.map((event, index) => (
          <div key={index} className={styles.newfeedItemBox}>
            {event.isDonation ?
              <div>🍫 <span className={styles.newfeedItemNickname}>{event.nickname}</span> 님이 <span className={styles.newfeedItemNickname}>{event.choco} 초코</span>를 후원했습니다.</div>
               :
              <div>🎉 <span className={styles.newfeedItemNickname}>{event.nickname}</span> 님이 팔로우했습니다.</div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
