'use client'

import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import * as styles from './index.css'

export default function StreamingVideo () {
  const [url, setUrl] = useState('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')

  const handleSetQuality = (quality: string) => {
    switch (quality) {
      case 'high':
        setUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
        break
      case 'medium':
        setUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4')
        break
      case 'low':
        setUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4')
        break
      default:
        setUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
    }
  }

  return (
    <div>
      <ReactPlayer
        // ref={playerRef}
        url={url}
        width='100%'
        height='100%'
        playing={true}
        controls={false} // 내장 컨트롤 비활성화
        light={false}
      />
      <div>
        {/* <button onClick={() => handleSetQuality('high')}>High</button>
        <button onClick={() => handleSetQuality('medium')}>Medium</button>
        <button onClick={() => handleSetQuality('low')}>Low</button> */}
      </div>
    </div>
  )
}

  // src: 'http://example.com/live-stream.m3u8',
  // type: 'application/x-mpegURL'
