'use client'

import { useEffect, useRef, useState, createContext, useContext } from 'react'
import Hls, { Level } from 'hls.js'
import Bumsang from './Bumsang'
import VideoPlayer from '@/components/StreamingVideo/Player'

export default function Tmp2() {
  const videoRef = useRef(null);
  const hls:any = useRef(null);
  const [speed, setSpeed] = useState<number>(0)
  useEffect(() => {
    function abrNetwork() {
      if (hls.current) {
        const currentLevel = hls.current.currentLevel;
        const maxLevel = hls.current.levels.length - 1;
        if (speed > 50000000 && currentLevel < maxLevel) {
          hls.current.currentLevel = currentLevel + 1;
          console.log(speed)
        } else if (speed <= 50000000 && currentLevel > 0) {
          hls.current.currentLevel = currentLevel - 1;
        }
      }
    }
    abrNetwork();
  }, [speed]);
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
      hls.current.loadSource('https://vingving.s3.ap-northeast-2.amazonaws.com/master.m3u8');
      hls.current.on(Hls.Events.MANIFEST_LOADED, (event:any, data:any) => {
        console.log("모든 데이터들 " +  JSON.stringify(data))
        // const audioStreams = data.levels.filter(level => level.audioCodec || (level.codecs && level.codecs.startsWith('mp4a')));
        // hls.current.addAudioTracks(audioStreams)
        // hls.current.audioTracks = audioStreams
        // console.log("오디오 트랙들 : " + JSON.stringify(audioStreams))
        console.log("비디오 트랙들 : " + hls.current.levels )

        for (const level in hls.current.levels )
        {
          console.log("비디오 레벨 " + JSON.stringify(level))
        }
        if (hls.current.audioTracks.length > 0) {
          console.log("오디오 발견")
          hls.current.audioTrack = 0; // 첫 번째 오디오 트랙 선택
        } else
        {
          console.log("오디오 트랙 발견 못함")
        }
      })

      hls.current.attachMedia(videoElement);
      
      hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play();
      });
    }
  }, [])
  return (
    <div>
      <Bumsang  speed ={speed} setSpeed = {setSpeed}  />
      <video
        ref={videoRef}
        autoPlay={true}
        controls={true}
      />
        <button onClick={() => {
          if (hls.current != null)
          {
            console.log("내용을 바꿉니다" + hls.current.currentLevel)
            if (hls.current.currentLevel == 1)
            {
              hls.current.currentLevel = 0
            } else 
            {
              hls.current.currentLevel = 1
            }
          }
        }}>
          {hls.current !== null && hls.current.currentLevel == 1 ? "네트워크 환경 안좋아짐": "네트워크 환경 좋아짐"}
        </button>
    </div>
  )
}

