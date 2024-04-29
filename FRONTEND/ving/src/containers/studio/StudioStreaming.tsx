'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import beforeStreaming from '#/images/MainLogo.png'
import SmallButton from '@/components/Button/SmallButton'

export default function StudioStreaming(): JSX.Element {
  const [ isStreaming, setIsStreaming ] = useState(false)

  const handleStreaming = () => {
    setIsStreaming(!isStreaming)
  }

  return (
      <div>
        {isStreaming ?
          <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' width="320" height="240" controls></video>
          :
          <div>
          <Image src={beforeStreaming} width="320" height="240" alt=""/>
          <p>라이브 스트리밍을 시작하려면 스트리밍 소프트웨어를 연결하세요.</p>
          <p>방송 시작 및 종료는 스트리밍 소프트웨어에서 가능합니다.</p>
          <SmallButton 
            text="방송시작"
            onClick={handleStreaming}
          />
          </div>
        }
      </div>
  )
}

