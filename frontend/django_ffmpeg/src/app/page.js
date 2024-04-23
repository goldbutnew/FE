"use client"
import { useEffect, useRef, useLayoutEffect } from 'react';
import Hls from 'hls.js';

export default function Home() {
  const localVideoRef = useRef(null);
  const serverVideoRef = useRef(null);
  const hls = useRef(null);

  useLayoutEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        localVideoRef.current.srcObject = stream;
        localVideoRef.current.play();
      } catch (error) {
        console.error('카메라 접근 오류:', error);
      }
    };

    startCamera();
  }, []);

  useLayoutEffect(() => {

    const startStreaming = async () => {
      const videoElement = localVideoRef.current;
      
      const stream = videoElement.srcObject;
      const mediaRecorder = new MediaRecorder(stream);
  
      const chunks = [];
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
  
      let timer;
  
      mediaRecorder.onstop = async () => {
        clearTimeout(timer);  // 타이머 초기화
  
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
  
        reader.onload = async (event) => {
          const arrayBuffer = event.target.result;
          const formData = new FormData();
          
          formData.append('video', new Blob([arrayBuffer], { type: 'video/webm' }));
  
          try {
            const response = await fetch('http://127.0.0.1:8000/camera_app/upload_video/', {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error('Network response was not ok');
            }

            // HLS 스트리밍 시작
            if (Hls.isSupported()) {
              hls.current = new Hls();
  
              hls.current.on(Hls.Events.ERROR, function(event, data) {
                console.error('Hls.js 오류 발생:', data);
              });
  
              hls.current.loadSource('http://127.0.0.1:8000/media/output.m3u8');
              hls.current.attachMedia(serverVideoRef.current);
  
              hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
                serverVideoRef.current.play();
              });
            }
          } catch (error) {
            console.error('전송 오류:', error);
          }
        };
  
        reader.readAsArrayBuffer(blob);
      };
  
      mediaRecorder.start();
      timer = setTimeout(() => {
        mediaRecorder.stop();
      }, 8000);  // 2초 후에 녹화를 종료합니다.
    };
  
    const interval = setInterval(startStreaming, 1000); // 3초마다 스트리밍 업데이트
  
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  
  

  const handlePreventDefault = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1>카메라 스트리밍</h1>
      <div style={{ display: 'flex' }}>
        <div>
          <h2>로컬 스트리밍</h2>
          <video ref={localVideoRef} width="320" height="240" autoPlay muted onLoadedMetadata={handlePreventDefault}></video>
        </div>
        <div>
          <h2>서버 스트리밍</h2>
          <video ref={serverVideoRef} width="320" height="240" autoPlay muted onLoadedMetadata={handlePreventDefault}></video>
        </div>
      </div>
      
    </div>
  );
}
