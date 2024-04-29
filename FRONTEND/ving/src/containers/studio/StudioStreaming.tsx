'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import beforeStreaming from '#/images/youtubeLogo.png'
import SmallButton from '@/components/Button/SmallButton'

export default function StudioStreaming(): JSX.Element {
  const [ isStreaming, setIsStreaming ] = useState(false)

  // 이 참조를 통해 실시간으로 비디오 스트림을 비디오 컴포넌트에 바인딩할 수 있습니다.
  const localVideoRef = useRef<HTMLVideoElement>(null)

  // 이 참조는 미디어 스트림을 녹화하는 데 사용됩니다.
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  useEffect(() => {
    // 비동기 함수로 카메라 및 마이크에 접근하여 스트림을 가져오는 로직입니다.
    const startCamera = async () => {
      try {
        // navigator.mediaDevices.getUserMedia를 호출하여 비디오 및 오디오 스트림을 요청합니다.
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        // 스트림을 localVideoRef의 current 속성에 바인딩하여 비디오 컴포넌트에 스트림을 표시합니다.
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream
        }
        // 스트림을 이용하여 MediaRecorder 인스턴스를 생성하고 mediaRecorder 참조에 저장합니다.
        mediaRecorder.current = new MediaRecorder(stream)
      } catch (error) {
        console.error('카메라 접근 오류:', error)
      }
    }

    startCamera()

    // 컴포넌트 언마운트 시 실행되는 클린업 함수입니다.
    return () => {
      // localVideoRef에서 스트림을 가져와 각 트랙(비디오, 오디오)을 종료합니다.
      const tracks = (localVideoRef.current?.srcObject as MediaStream)?.getTracks()
      tracks?.forEach(track => track.stop())
    }
  }, [])

  const handleStreaming = () => {
    setIsStreaming(!isStreaming)
  }

  return (
    <div>
      <p>로컬 카메라 스트리밍</p>
      <div>
        {isStreaming ?
          <video ref={localVideoRef} width="320" height="240" controls></video>
          :
          <Image src={beforeStreaming} width="320" height="240" alt=""/>
        }
      </div>

      <SmallButton 
        text="방송시작"
        onClick={handleStreaming}
      />  
    </div>
  )
}

