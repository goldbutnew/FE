

'use client'
import React, { useState } from 'react';

const NetworkSpeedTest = () => {
    const [speed, setSpeed] = useState(null);

    const runSpeedTest = () => {
        let startTime, endTime;
        const fileSize = 10 * 1024 * 1024; // 10MB file

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                endTime = performance.now();
                const duration = (endTime - startTime) / 1000; // in seconds
                const speedMbps = (fileSize / duration) * 8 / 1000000; // Mbps
                setSpeed(speedMbps.toFixed(2));
            }
        };
        xhr.open('GET', 'https://example.com/sample-file.mp4', true); // 대상 파일의 URL로 변경
        xhr.send();
        startTime = performance.now();
    };

    return (
        <div>
            <h1>Network Speed Test</h1>
            <button onClick={runSpeedTest}>Run Speed Test</button>
            {speed && <p>네트워크 속도: {speed} Mbps</p>}
        </div>
    );
};

export default NetworkSpeedTest;