
'use client'

// import React, { useState } from 'react'
// import Video from 'next-video'
// import Player from './Player'
 
// export default function StreamingVideo() {

//   return (
//     <div>
//       <Video as={Player} src='http://127.0.0.1:8000/media/qudtls_720p.m3u8' />
//       {/* // <Video src='http://127.0.0.1:8000/media/qudtls_7 20p.m3u8' controls /> */}
//     </div>
//   )
// }

import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import * as styles from './index.css'

export default function StreamingVideo () {
  const [url, setUrl] = useState('http://127.0.0.1:8000/media/qudtls_720p.m3u8')

  const handleSetQuality = (quality: string) => {
    switch (quality) {
      case '720p':
        setUrl('http://127.0.0.1:8000/media/qudtls_720p.m3u8')
        break
      case '360p1':
        setUrl('http://127.0.0.1:8000/media/cjswo_360p.m3u8')
        break
      case '360p2':
        setUrl('http://127.0.0.1:8000/media/chswo_360p.m3u8')
        break
      default:
        setUrl('http://127.0.0.1:8000/media/qudtls_720p.m3u8')
    }
    console.log(quality, url, '이걸로 바뀜')
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
        <button onClick={() => handleSetQuality('720p')}>720</button>
        <button onClick={() => handleSetQuality('360p1')}>360.1</button>
        <button onClick={() => handleSetQuality('360p2')}>360.2</button>
      </div>
    </div>
  )
}

//   // src: 'http://example.com/live-stream.m3u8',
//   // type: 'application/x-mpegURL'
