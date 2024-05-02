'use client'
import React from "react";
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { userName } from "../profile/index.css";

const roomId = 1

function onMessageReceived(message: StompJs.Message) {
  console.log("씨이이이이이이")
  console.log(message.body)
}
function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




export default function ChatTest() {
  const client = useRef<any>({});


  const subscribe = () => {
    client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived);
  };
  
  
  function Join() {
    const message = {
      userName: "myUserName",
      nickname: "나야나",
      timeStamp: formatTimestamp(Date.now()),
      donation : 0,
      text : "euphoria"
    };
    // console.log(JSON.stringify(message))
    client.current.publish({
      destination: `/pub/channel/${roomId}`,
      body: JSON.stringify(message),
    });
  }
  
  function Disconnect() {
    const message = {
      userName: "myUserName",
      nickname: "나야나",
      timeStamp: Date.now(),
      donation : 0,
      text : "euphoria"
    };
    client.current.publish({
      destination: `/pub/channel/${roomId}`,
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

    connect();

  }, [])
  
  return (
    <div>h3</div>
  )
}