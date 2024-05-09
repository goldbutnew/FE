'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import Bumsang from './Bumsang'
import VideoPlayer from '@/components/StreamingVideo/Player'
import Link from 'next/link'

export default function Tmp() {
  const videoRef = useRef(null);
  const hls = useRef(null);

  useEffect(() => {
    syncPlayPause()
  }, [isPlaying])

  useEffect(() => {
    const videoElement = videoRef.current
    const audioElement = audioRef.current

    const setupHls = (element, src) => {
      if (Hls.isSupported() && element) {
        const hls = new Hls()
        
        console.log(src)

        hls.loadSource(src)
        hls.attachMedia(element)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          element.play()
        })
        return hls
      }
    }

    const hlsVideo = setupHls(videoElement, `https://vingving.s3.ap-northeast-2.amazonaws.com/720p/anjdidhodkseho.m3u8`)
    const hlsAudio = setupHls(audioElement, `https://vingving.s3.ap-northeast-2.amazonaws.com/256/anjdidhodkseho.m3u8`)

    return () => {
      if (hlsVideo) hlsVideo.destroy()
      if (hlsAudio) hlsAudio.destroy()
    }
  }, [url])

  return (
    <div>
      <Bumsang/>
      <Link href={`/tmp2`}>test</Link>
      <video
        ref={videoRef}
        autoPlay={true}
        controls={false}
      />


    </div>
  )
}