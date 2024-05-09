"use client"
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function Home() {
  const videoRef = useRef(null);
  const hls = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (Hls.isSupported()) {
      hls.current = new Hls();

      hls.current.on(Hls.Events.ERROR, function(event, data) {
        console.error('Hls.js 오류 발생:', data);
      });

      hls.current.loadSource(`http://127.0.0.1:8000/media/qudtls_480p/qudtls_480p.m3u8`);
      // hls.current.loadSource('https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_720p.m3u8');
      hls.current.attachMedia(videoElement);

      hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play();
      });
    }
  }, []);

  return (
    <div>
      <h1>HLS Streaming with Next.js</h1>
      <video ref={videoRef} controls autoPlay muted></video>
    </div>
  );
}
