'use client'

import { useEffect, useRef, useState } from 'react'
import Hls, { Level } from 'hls.js'
import Bumsang from './Bumsang'
import VideoPlayer from '@/components/StreamingVideo/Player'


export default function Tmp2() {
  const videoRef:React.RefObject<HTMLVideoElement> = useRef(null)
  const hls:any = useRef(null)
  const [speed, setSpeed] = useState<number>(0)
  const [chunk, setChunk] = useState<number>(0)
  const [buffer, setBuffer] = useState<number>(0)
  useEffect(() => {

    function checkBufferStatus() {
      if (videoRef.current === null) 
      {return 0}
      else
      {
        const buffered = videoRef.current.buffered
        const currentTime = videoRef.current.currentTime
        let bufferEnd : number = 0
    
        // 현재 재생 시간 이후로 버퍼링된 구간을 찾음
        for (let i = 0; i < buffered.length; i++) {
            if (buffered.start(i) <= currentTime && currentTime < buffered.end(i)) {
                bufferEnd = buffered.end(i)
                break
            }
        }
    
        // 버퍼링된 길이 계산
        const bufferedAhead = bufferEnd - currentTime
        
        console.log(`Buffered ahead time: ${bufferedAhead} seconds.`)
        return bufferedAhead
      }
  }


    setBuffer(checkBufferStatus())

    function definePosition() {
      if (hls.current === null) return
      let evaluateThisRate : number = chunk / speed
      const currentLevel = hls.current.currentLevel
      const maxLevel = hls.current.levels.length - 1
      console.log("지금 청크를 지금 스루풋으로 받는데 걸리는 시간", evaluateThisRate)
      console.log("buffer에 남아있는 시간", buffer)
      console.log("지금 내 해상도 레벨", currentLevel)
      if (evaluateThisRate < buffer && currentLevel < maxLevel)
      {
        hls.current.currentLevel = currentLevel + 1
        console.log("더 높은 비트레이트로 변경")
      }
      else if (evaluateThisRate > buffer && currentLevel > 0)
      {
        console.log("뭐야")
        hls.current.currentLevel = currentLevel - 1
        console.log("더 낮은 비트레이트로 변경")
      }
    }
    definePosition()
  }, [speed])

  

  useEffect(() => {
    const videoElement:any = videoRef.current

    if (Hls.isSupported()) {
      hls.current = new Hls()


      hls.current.on(Hls.Events.FRAG_LOADED, function(event:any, data:any) {
        setChunk(data.frag.stats.total)
      })
      

      hls.current.on(Hls.Events.ERROR, function(event:any, data:any) {
        console.error('Hls.js 오류 발생:', data)
      })
      
      hls.current.loadSource('https://vingving.s3.ap-northeast-2.amazonaws.com/master.m3u8')
      hls.current.on(Hls.Events.MANIFEST_LOADED, (event:any, data:any) => {
        console.log("모든 데이터들 " +  JSON.stringify(data))
        console.log("비디오 트랙들 : " + hls.current.levels )

        for (const level in hls.current.levels )
        {
          console.log("비디오 레벨 " + JSON.stringify(level))
        }
        if (hls.current.audioTracks.length > 0) {
          console.log("오디오 발견")
          hls.current.audioTrack = 0 // 첫 번째 오디오 트랙 선택
        } else
        {
          console.log("오디오 트랙 발견 못함")
        }
      })

      hls.current.attachMedia(videoElement)
      
      hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play()
      })
    }
  }, [])
  return (
    <div>
      <Bumsang setSpeed = {setSpeed} />
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






