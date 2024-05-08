'use client'

import { useRef, useState } from 'react'
import * as styles from '../../containers/tmp/index.css'

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5) // 초기 볼륨 설정
  const [isMuted, setIsMuted] = useState(false) // 음소거 상태

  const togglePlayPause = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused || video.ended) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    if (!isMuted) {
      setVolume(video.volume)
      video.volume = 0
      setIsMuted(true)
    } else {
      video.volume = volume
      setIsMuted(false)
    }
  }

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentNode
    if (!videoContainer) return

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        alert(`Cannot enable fullscreen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className={styles.videoContainer}>
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ref={videoRef}
        autoPlay={true}
        controls={false}
        className={styles.videoPlayer}
      />
      <div className={styles.controls}>
        <button className={styles.button} onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
        <button className={styles.button} onClick={toggleMute}>{isMuted ? '🔊' : '🔇'}</button>
        <button className={styles.button} onClick={toggleFullscreen}>🔳</button>
      </div>
    </div>
  )
}

export default VideoPlayer
