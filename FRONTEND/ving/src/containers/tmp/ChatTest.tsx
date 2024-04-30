'use client'
import React from "react";
import { useState } from 'react';
import { useRef, useEffect } from 'react';
import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const roomId = 1

function onMessageReceived(message: StompJs.Message) {
  console.log("씨이이이이이이")
}





export default function ChatTest() {
  const client = useRef<any>({});


  const subscribe = () => {
    client.current.subscribe(`/sub/channel/${roomId}`, onMessageReceived);
  };
  
  
  function Join() {
    const message = {
      code: 100,
      id: "myUserName",
    };
    // console.log(JSON.stringify(message))
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
  
  return (
    <div>h3</div>
  )
}