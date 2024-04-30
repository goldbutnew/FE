'use client'

import { useState, useEffect  } from 'react'
import useStreamingStore from '@/store/StreamingStore'

import NetworkSpeedTest from '../streaming/Network'
import Image from 'next/image'
import logo from '#/images/main-logo.png'
import DefaultInput from '@/components/Input/DefaultInput'
import Radio from '@/components/Input/Radio'
import SmallButton from '@/components/Button/SmallButton'
import Streaming from '@/components/StreamingVideo'


export default function StudioStreaming() {
  const { sendStreamTitle, sendStreamThumbnail, sendStreamLimit } = useStreamingStore()
  const [ title, setTitle ] = useState('')
  const [ thumbnail, setThumbnail ] = useState('')
  const [ limit, setLimit ] = useState(false)

  const submitStreamSetting = () => {
    sendStreamTitle(title)
    sendStreamThumbnail(thumbnail)
    sendStreamLimit(limit)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const toggleLimit = () => {
    setLimit(!limit)  // limit 상태를 토글
  }

  return (
    <div>
      <div>
        <Streaming />
        {/* <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' controls></video> */}
      </div>

      <div>
        <label>방송 제목</label>
        <DefaultInput type='text' value={title} onChange={handleTitle}/>
      </div>

      <div>
        <p>미리 보기 이미지</p>
        <Image src={logo} alt="logo" />
      </div>

      <div>
        <p>연령제한</p>
        <Radio text='시청자를 19세로 제한하겠습니까?' checked={limit} onChange={toggleLimit}/>
      </div>

      <SmallButton text="업데이트" onClick={submitStreamSetting}/>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <NetworkSpeedTest />
    </div>

  )
}
