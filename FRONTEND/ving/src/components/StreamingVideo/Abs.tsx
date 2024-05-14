'use client'

import axios from "axios"
import React, { useEffect } from 'react'

interface AbsProps {
  setSpeed: (speed: number) => void
}


export default function Abs({setSpeed}: AbsProps) {
  const url : string = "https://vingving.s3.ap-northeast-2.amazonaws.com/10MB.txt"

  async function fetchSegmentWithAxios(url: string): Promise<void> {
    const startTime = performance.now() // 요청 시작 시간을 기록
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' }) // 세그먼트 요청
        const data = response.data // `axios`는 `arrayBuffer`를 직접 `data`로 반환합니다.
        const endTime = performance.now() // 요청 완료 시간을 기록

        const fetchTime = endTime - startTime // 세그먼트 패치 타임 계산
        const dataSize = data.byteLength // 다운로드된 데이터 크기
        const throughput = dataSize / fetchTime * 1000 // 스루풋 계산 (바이트/초)

        console.log(`Fetch Time: ${fetchTime} ms`)
        console.log(`Data Size: ${dataSize} bytes`)
        console.log(`Throughput: ${throughput.toFixed(2)} bytes/sec`)
        setSpeed(throughput)

    } catch (error : any) {
        console.error("Error fetching segment:", error)
        // axios에서 발생하는 에러에 대한 추가 정보를 보려면 다음과 같이 error 객체를 사용할 수 있습니다.
        if (error.response) {
            // 서버가 상태 코드를 응답으로 보낸 경우
            console.log(error.response.data)
            console.log(error.response.status)
            console.log(error.response.headers)
        } else if (error.request) {
            // 요청이 이루어졌으나 응답을 받지 못한 경우
            console.log(error.request)
        } else {
            // 요청을 설정하는 동안 에러가 발생한 경우
            console.log('Error', error.message)
        }
    }
}

  useEffect(() => {
    const interval = setInterval(function () {
      fetchSegmentWithAxios(url)
    }, 1000) // 1초마다 runSpeedTest 실행
    return () => clearInterval(interval) // 컴포넌트 언마운트 시 인터벌 정리
  }, [])
  return (
    <h1>ㅇㅇㅇ</h1>
  )
}