'use client'

import { useRef, useState, useEffect } from 'react'

import * as styles from './index.css'
import DropdownMenu from '../DropdownMenu/DropdownMenu'
import MenuItem from '../DropdownMenu/MenuItem'

import { IoPlay } from "react-icons/io5"
import { IoStop } from "react-icons/io5"
import { RiVolumeUpFill } from "react-icons/ri"
import { RiVolumeMuteFill } from "react-icons/ri"
import { MdOutlineFullscreen } from "react-icons/md"
import { MdOutlineFullscreenExit } from "react-icons/md"
import { IoIosSettings } from "react-icons/io"
import { MdPictureInPictureAlt } from "react-icons/md"

const VideoPlayer = ({ containerRef, videoRef, setResolution }) => {
  const [ isPlaying, setIsPlaying ] = useState(true)
  const [ volume, setVolume ] = useState(0)
  const [ storedVolume, setStoredVolume ] = useState(0.5)
  const [ isMuted, setIsMuted ] = useState(true)
  const [ isHovering, setIsHovering ] = useState(false)
  const [ currentTime, setCurrentTime ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const [ isFull, setIsFull ] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration)
      }
      const handleTimeUpdate = () => {
        setCurrentTime(video.currentTime)
      }
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('timeupdate', handleTimeUpdate)

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('timeupdate', handleTimeUpdate)
      }
    }
  }, [videoRef])

  const handleSeekChange = (event) => {
    const video = videoRef.current
    const newTime = parseFloat(event.target.value)
    if (video) {
      video.currentTime = newTime
      setCurrentTime(newTime)
    }
  }
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
    video.muted = false
    if (!video) return

    if (!isMuted) {
      setStoredVolume(video.volume)  // 현재 볼륨 저장
      video.volume = 0
      setIsMuted(true)
    } else {
      video.volume = storedVolume  // 저장된 볼륨으로 복원
      setVolume(storedVolume)
      setIsMuted(false)
    }
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value)
    const video = videoRef.current
    if (video) {
      video.volume = newVolume
      setVolume(newVolume)
      if (newVolume === 0) {
        setIsMuted(true)
      } else {
        setIsMuted(false)
        setStoredVolume(newVolume)
      }
    }
  }
  
  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleFullscreen = () => {
    const video = containerRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      setIsFull(true)
      video.requestFullscreen().catch(err => {
        alert(`Cannot enable fullscreen mode: ${err.message}`)
      })
    } else if (document.fullscreenElement === video) {
      setIsFull(false)
      document.exitFullscreen()
    }
  }

  // esc로 전체 화면 나갈 시 체크용
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFull(false)
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const togglePip = () => {
    const video = videoRef.current
    if (!video || !document.pictureInPictureEnabled) {
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

  const handleSetQuality = (quality: string) => {
    switch (quality) {
      case 'AUTO':
        setResolution('auto')
        break
      case '480p':
        setResolution(2)
        break
      case '720p':
        console.log('720으로 바꿈')
        setResolution(1)
        break
      case '1080p':
        console.log('1080으로 바꿈')
        setResolution(0)
        break
      default:
        setResolution('auto')
    }
  }

  return (
    <div className={styles.player}>
      <div className={styles.playBarContainer}>
        <input
          type="range"
          min="0"
          max={duration}
          step="1"
          value={currentTime}
          onChange={handleSeekChange}
          className={styles.videoSlider}
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.justifyControls}>
          <button 
            onClick={togglePlayPause}
          >
            {isPlaying ? <IoStop color="white" size={25}/> : <IoPlay color="white" size={25}/>}
          </button>
          <div className={styles.justifyVolume} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <button 
              onClick={toggleMute}
            >
              {isMuted ? <RiVolumeMuteFill color="white" size={25}/> : <RiVolumeUpFill color="white" size={25}/>}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className={styles.volumeSlider}
              style={{ display: isHovering ? 'block' : 'none' }}
            />
          </div>
          <div>
            <span className={styles.timeText}>{formatTime(currentTime)}</span>
            <span className={styles.durationText}> | {formatTime(duration)}</span>
          </div>
        </div>
        <div className={styles.justifyControls}>
          <button 
            onClick={toggleFullscreen}
          >
            {isFull ? <MdOutlineFullscreenExit color="white" size={25}/> : <MdOutlineFullscreen color="white" size={25}/>}
          </button>
          <button onClick={togglePip}><MdPictureInPictureAlt color="white" size={25}/></button>

          <div>
            <DropdownMenu 
              button={<button><IoIosSettings color="white" size={25}/></button>}
            >
              <MenuItem>
                <button onClick={() => handleSetQuality('AUTO')}>AUTO</button>
              </MenuItem>
              <MenuItem>
                <button onClick={() => handleSetQuality('480p')}>480p</button>
              </MenuItem>
              <MenuItem>
                <button onClick={() => handleSetQuality('720p')}>720p</button>
              </MenuItem>
              <MenuItem>
                <button onClick={() => handleSetQuality('1080p')}>1080p</button>
              </MenuItem>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
