'use client'

import { useState, useEffect  } from 'react'
import NetworkSpeedTest from '../streaming/Network'
import Image from 'next/image'
import logo from '#/images/MainLogo.png'
import DefaultInput from '@/components/Input/DefaultInput'
import ToggleButton from '@/components/Button/ToggleButton'

export default function StudioStreaming(): JSX.Element {
  // const [ isStreaming, setIsStreaming ] = useState(false)

  // const handleStreaming = () => {
  //   setIsStreaming(!isStreaming)
  // }
  const [ title, setTitle ] = useState('')
  const [isActive, setIsActive] = useState(false)

  const handleToggle = (newState: boolean) => {
    setIsActive(newState)
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
    console.log('엑시오스 쏘면 됨')
  }

  return (
    <div>
      <div>
        <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' width="320" height="240" controls></video>
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
        <ToggleButton 
          isActive={isActive}
          onChange={handleToggle}
        />
        <p>시청자를 19세로 제한하겠습니까?</p>
      </div>

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
