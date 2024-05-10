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


const VideoPlayer = ({ videoRef, setUrl }) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0)
  const [storedVolume, setStoredVolume] = useState(0.5)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovering, setIsHovering] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

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

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch(err => {
        alert(`Cannot enable fullscreen mode: ${err.message}`)
      })
    } else if (document.fullscreenElement === video) {
      document.exitFullscreen()
    }
  }

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
        console.log('auto로 바꿈')
        setUrl('720p')
        break
      case '360p':
        console.log('360으로 바꿈')
        setUrl('360p')
        break
      case '720p':
        console.log('720으로 바꿈')
        setUrl('720p')
        break
      case '480p':
        console.log('480으로 바꿈')
        setUrl('1080p')
        // setUrl('480p')
        break
      default:
        setUrl('720p')
    }
  }

  return (
    <div>
      <input
        type="range"
        min="0"
        max={duration}
        step="1"
        value={currentTime}
        onChange={handleSeekChange}
        className={styles.videoSlider}
      />
      <div className={styles.controls}>
        <button className={styles.button} onClick={togglePlayPause}>{isPlaying ? <IoStop color="Black" size={20}/> : <IoPlay color="Black" size={20}/>}</button>
        <button 
          className={styles.button}
          onClick={toggleMute}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {isMuted ? <RiVolumeMuteFill color="Black" size={20}/> : <RiVolumeUpFill color="Black" size={20}/>}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className={styles.volumeSlider}
          style={{ display: isHovering ? 'block' : 'none' }}
        />

        <button className={styles.button} onClick={toggleFullscreen}><MdOutlineFullscreen color="Black" size={20}/></button>
        <button className={styles.button} onClick={togglePip}><MdPictureInPictureAlt color="Black" size={20}/></button>

        <div>
          <DropdownMenu 
            button={<button className={styles.button}><IoIosSettings color="Black" size={20}/></button>}
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
              <button onClick={() => handleSetQuality('360p')}>360p</button>
            </MenuItem>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

export default VideoPlayer
