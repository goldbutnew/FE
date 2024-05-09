'use client'

import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import * as styles from './index.css'
import VideoPlayer from './Player'

export default function StreamingVideo() {
  const videoRef = useRef(null)
  const [url, setUrl] = useState('720p')

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(`https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_${url}.m3u8`)
      hls.attachMedia(videoElement)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play()
      })

      // Cleanup function
      return () => {
        hls.destroy()
      }
    }
  }, [url])  // url을 종속성 배열에 추가

  return (
    <div>
      <video
        src={`https://vingving.s3.ap-northeast-2.amazonaws.com/qudtls_${url}.m3u8`}
        ref={videoRef}
        autoPlay={true}
        controls={false}
        className={styles.videoResize}
      />
      <div>
        <VideoPlayer videoRef={videoRef} setUrl={setUrl} />
      </div>
    </div>
  )
}