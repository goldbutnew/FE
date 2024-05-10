'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import Bumsang from './Bumsang'
import VideoPlayer from '@/components/StreamingVideo/Player'

export default function Tmp() {
  const videoRef = useRef(null);
  const hls:any = useRef(null);

  useEffect(() => {
    const videoElement:any = videoRef.current;

    if (Hls.isSupported()) {
      hls.current = new Hls();

      hls.current.on(Hls.Events.ERROR, function(event:any, data:any) {
        console.error('Hls.js 오류 발생:', data);
      });
      
      // hls.current.loadSource(`https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_480p/qudtls_480p.m3u8`);
      // hls.current.loadSource('https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_720p.m3u8');
      // hls.current.loadSource('file://C:/Users/SSAFY/Downloads/GOODCODE/S10P31A203/BACKEND/STATIC/master.m3u8');
      hls.current.loadSource('https://mozzibucket.s3.ap-northeast-2.amazonaws.com/master.m3u8');
      hls.current.on(Hls.Events.MANIFEST_LOADED, (event:any, data:any) => {
        console.log("모든 데이터들 " +  JSON.stringify(data))
        const audioStreams = data.levels.filter(level => level.audioCodec || (level.codecs && level.codecs.startsWith('mp4a')));
        // hls.current.addAudioTracks(audioStreams)
        hls.current.audioTracks = audioStreams
        console.log("오디오 트랙들 : " + JSON.stringify(audioStreams))
        console.log("비디오 트랙들 : " + hls.current.videoElement)

        if (hls.current.audioTracks.length > 0) {
          console.log("오디오 발견")
          hls.current.audioTrack = 0; // 첫 번째 오디오 트랙 선택
        } else
        {
          console.log("오디오 트랙 발견 못함")
        }
      });

      hls.current.attachMedia(videoElement);
      

      hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play();
      });
    }
  }, [])
  return (
    <div>
      <Bumsang/>
      <video
        ref={videoRef}
        autoPlay={true}
        controls={false}
      />
      <p>djgb</p>

    </div>
  )
}