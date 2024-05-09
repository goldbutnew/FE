'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import Bumsang from './Bumsang'
import VideoPlayer from '@/components/StreamingVideo/Player'

export default function Tmp() {
  const videoRef = useRef(null)
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [url, setUrl] = useState('720p')

  const syncPlayPause = () => {
    const videoElement = videoRef.current
    const audioElement = audioRef.current
    if (!videoElement || !audioElement) return

    if (isPlaying) {
      videoElement.play()
      audioElement.play()
    } else {
      videoElement.pause()
      audioElement.pause()
    }
  }

  useEffect(() => {
    syncPlayPause()
  }, [isPlaying])

  useEffect(() => {
    let intervalId = null
    const videoElement = videoRef.current
    const audioElement = audioRef.current

    const setupHls = (element, src) => {
      if (Hls.isSupported() && element) {
        const hls = new Hls()
        console.log(`Loading source: ${src}`)
        hls.loadSource(src)
        hls.attachMedia(element)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          element.play().catch(err => console.error("자동 재생 실패:", err))
        })
        return hls
      }
    }

    const loadStreams = () => {
      // const videoSrc = `https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_480p/qudtls_480p.m3u8`
      const videoSrc = `http://127.0.0.1:8000/media/qudtls_480p/qudtls_480p.m3u8`
      const audioSrc = `https://vingving.s3.ap-northeast-2.amazonaws.com/256/anjdidhodkseho.m3u8`
      const hlsVideo = setupHls(videoElement, videoSrc)
      const hlsAudio = setupHls(audioElement, audioSrc)

    //   return () => {
    //     // if (hlsVideo) hlsVideo.destroy()
    //     // if (hlsAudio) hlsAudio.destroy()
    //   }
    }

    // 첫 로드 및 설정
    const cleanup = loadStreams()

    // 10초마다 반복 실행
    // intervalId = setInterval(() => {
    //   console.log("Refreshing HLS streams")
    //   cleanup()  // 이전 스트림 정리
    //   loadStreams()  // 새 스트림 로드
    // }, 10000)

    // return () => {
    //   if (intervalId) clearInterval(intervalId)  // 인터벌 정리
    //   cleanup()  // HLS 인스턴스 정리
    // }
  }, [url])

  return (
    <div>
      <Bumsang/>
      <video
        ref={videoRef}
        autoPlay={true}
        controls={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <video
        ref={audioRef}
        autoPlay={true}
        controls={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <VideoPlayer videoRef={videoRef} setUrl={setUrl} />
    </div>
  )
}