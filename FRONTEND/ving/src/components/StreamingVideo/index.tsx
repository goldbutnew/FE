"use client"

import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default function StreamingVideo() {

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    sources: [{
      src: 'http://example.com/live-stream.m3u8',
      type: 'application/x-mpegURL'
    }]
  }

  const videoRef = useRef()

  useEffect(() => {
    const videoElement = videoRef.current
    let player
    if (videoElement) {
      player = videojs(videoElement, videoJsOptions)

      player.on('ready', () => {
        console.log('Player is ready')
      })
    }

    return () => {
      if (player) {
        player.dispose()
      }
    }
  }, [videoJsOptions])

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js"></video>
    </div>
  )
}
