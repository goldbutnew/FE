

'use client'
import React, { useEffect, useState } from 'react'

const NetworkSpeedTest = () => {
    const [speed, setSpeed] = useState(null)

    const runSpeedTest = () => {
        let startTime : number
        let endTime : number
        const fileSize = 10 * 1024 * 1024 // 10MB file

        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                endTime = performance.now()
                const duration = (endTime - startTime) / 1000 // in seconds
                const speedMbps = (fileSize / duration) * 8 / 1000000 // Mbps
                setSpeed(speedMbps.toFixed(2))
            }
        }
        xhr.open('GET', 'http://k10a203.p.ssafy.io:3000/', true) // 대상 파일의 URL로 변경
        xhr.send()
        startTime = performance.now()
    }

    useEffect(() => {
        const interval = setInterval(runSpeedTest, 1000) // 1초마다 runSpeedTest 실행
        return () => clearInterval(interval) // 컴포넌트 언마운트 시 인터벌 정리
    }, [])

    return (
        <div>
            <h1>Network Speed Test</h1>
            <button onClick={runSpeedTest}>Run Speed Test</button>
            {speed ? <p>네트워크 속도: {speed} Mbps</p> : <p>속도 테스트 진행 중...</p>}
        </div>
    )
}

export default NetworkSpeedTest