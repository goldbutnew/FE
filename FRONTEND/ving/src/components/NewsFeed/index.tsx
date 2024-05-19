'use client'

import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import * as styles from './index.css';
import { line } from "@/styles/common.css";
import useAuthStore from '@/store/AuthStore';

interface Event {
  isDonation: boolean;
  username: string;
  nickname: string;
  choco: number;
}

export default function NewsFeed() {
  const { userData } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
  const [subscription, setSubscription] = useState<Stomp.Subscription | null>(null);

  const roomId = btoa(userData.username);

  const onMessageReceived = (msg: any) => {
    try {
      console.log("Raw message received:", msg);
      const event: Event = JSON.parse(msg.body);
      setEvents(prevEvents => [...prevEvents, event]);
      console.log("Parsed event:", event);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const connect = () => {
    console.log("Attempting to connect to WebSocket server...");
    const socket = new SockJS('https://k10a203.p.ssafy.io/ws');
    const client = Stomp.over(socket);

    client.reconnect_delay = 5000;
    client.debug = (str) => {
      console.log('STOMP Debug:', str);
    };

    client.onConnect = (frame) => {
      console.log("뉴스피드 WebSocket 연결 완료:", frame);
      const sub = client.subscribe(`/sub/streamer/${roomId}`, onMessageReceived, {
        id: `sub-${roomId}`,
        ack: 'client'
      });
      setSubscription(sub);
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.onDisconnect = (frame) => {
      console.log("뉴스피드 WebSocket 연결 해제 완료:", frame);
    };

    client.onWebSocketError = (event) => {
      console.error("WebSocket error observed:", event);
    };

    client.onWebSocketClose = (event) => {
      console.log("WebSocket closed, attempting to reconnect...");
      setTimeout(() => {
        connect();
      }, 5000);
    };

    client.activate();
    setStompClient(client);
  };

  useEffect(() => {
    connect();
    return () => {
      try {
        subscription?.unsubscribe();
        stompClient?.deactivate();
        console.log("뉴스피드 WebSocket 연결 해제 시도 중...");
      } catch (error) {
        console.error("Error during WebSocket disconnection:", error);
      }
    };
  }, []);

  return (
    <div className={styles.newsFeedContainer}>
      <div className={styles.title}>뉴스피드</div>
      <hr className={line} />
      <div className={styles.newsFeedContent}>
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
