'use client'

import { useRef, useState } from 'react'
import * as styles from '../../containers/tmp/index.css'
import Video from 'next-video'

const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

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
  };

  const changeVolume = (delta: number) => {
    const video = videoRef.current
    if (!video) return

    let newVolume = video.volume + delta
    video.volume = Math.max(0, Math.min(1, newVolume))
  };

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        alert(`Cannot enable fullscreen mode: ${err.message}`)
      })
    } else {
      document.exitFullscreen()
    }
  };

  const togglePip = () => {
    const video = videoRef.current
    if (!video) return
  
    if (!document.pictureInPictureEnabled) {
      alert('Picture in Picture is not supported by your browser.')
      return
    }
  
    if (video !== document.pictureInPictureElement) {
      video.requestPictureInPicture().catch(err => {
        alert(`Error trying to switch to Picture in Picture: ${err.message}`)
      })
    } else {
      document.exitPictureInPicture().catch(err => {
        alert(`Error trying to exit Picture in Picture: ${err.message}`)
      })
    }
  }

  return (
    <div className={styles.videoContainer}>
      <Video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' ref={videoRef} className={styles.videoPlayer}>
        <source src="movie.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </Video>
      <div className={styles.controls}>
        <button className={styles.button} onClick={togglePlayPause}>{isPlaying ? '⏸️' : '▶️'}</button>
        <button className={styles.button} onClick={() => changeVolume(-0.1)}>🔉</button>
        <button className={styles.button} onClick={() => changeVolume(0.1)}>🔊</button>
        <button className={styles.button} onClick={toggleFullscreen}>🔳</button>
        <button className={styles.button} onClick={togglePip}>🖼️</button>
      </div>
    </div>
  )
}

export default VideoPlayer
 






// import type { PlayerProps } from 'next-video';
// import ReactPlayer from 'react-player';
 
// export default function Player(props: PlayerProps) {
//   let { asset, src, poster, blurDataURL, thumbnailTime, ...rest } = props;
//   let config = { file: { attributes: { poster } } };
 
//   return <ReactPlayer
//     url={src}
//     config={config}
//     width="100%"
//     height="100%"
//     {...rest}
//   />;
// }