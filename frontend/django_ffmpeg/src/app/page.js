// "use client"
// import { useEffect, useRef, useLayoutEffect, useState } from 'react';
// import Hls from 'hls.js';

// export default function Home() {
//   const localVideoRef = useRef(null);
//   const serverVideoRef = useRef(null);
//   const hls = useRef(null);
//   const mediaRecorder = useRef(null);  // MediaRecorder를 useRef로 관리
//   const [sequenceNumber, setSequenceNumber] = useState(0);

//   useLayoutEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true ,audio : true });
//         mediaRecorder.current = new MediaRecorder(stream);  // MediaRecorder 초기화
//         localVideoRef.current.srcObject = stream;
//         localVideoRef.current.play();
//       } catch (error) {
//         console.error('카메라 접근 오류:', error);
//       }
//     };

//     if (Hls.isSupported()) {
//       hls.current = new Hls();

//       hls.current.on(Hls.Events.ERROR, function(event, data) {
//         console.error('Hls.js 오류 발생:', data);
//       });

//       hls.current.loadSource(`http://127.0.0.1:8000/media/qudtls.m3u8`);
//       // hls.current.loadSource(`http://127.0.0.1:8000/media/output.m3u8`);
//       hls.current.attachMedia(videoElement);

//       hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
//         videoElement.play();
//       });
//     }
//     startCamera();
//   }, []);
  
//   useEffect(() => {
//     const videoElement = serverVideoRef.current;

//     const handleTimeUpdate = () => {
//       const currentTime = videoElement.currentTime;
//       const newSequenceNumber = Math.floor(currentTime / 2);

//       if (newSequenceNumber !== sequenceNumber) {
//         setSequenceNumber(newSequenceNumber);
//       }
//     };

//     videoElement.addEventListener('timeupdate', handleTimeUpdate);

//     return () => {
//       videoElement.removeEventListener('timeupdate', handleTimeUpdate);
//     };
//   }, [sequenceNumber]);

//   useLayoutEffect(() => {
//     const startStreaming = async () => {
//       const videoElement = localVideoRef.current;
//       const stream = videoElement.srcObject;
  
//       if (!mediaRecorder.current) return;  // MediaRecorder가 초기화되지 않았을 경우 종료
  
//       const chunks = [];
//       mediaRecorder.current.ondataavailable = event => {
//         if (event.data.size > 0) {
//           chunks.push(event.data);
//         }
//       };
  
//       mediaRecorder.current.onstop = async () => {
//         const blob = new Blob(chunks, { type: 'video/webm' });
//         const reader = new FileReader();
  
//         reader.onload = async (event) => {
//           const arrayBuffer = event.target.result;
//           const formData = new FormData();
          
//           formData.append('video', new Blob([arrayBuffer], { type: 'video/webm' }));
  
//           try {
//             const response = await fetch('http://127.0.0.1:8000/camera_app/upload_video/', {
//               method: 'POST',
//               body: formData,
//             });
  
//             if (!response.ok) {
//               throw new Error('Network response was not ok');
//             }
  
//             if (Hls.isSupported()) {
//               hls.current = new Hls();
  
//               hls.current.on(Hls.Events.ERROR, function(event, data) {
//                 console.error('Hls.js 오류 발생:', data);
//               });
  
//               hls.current.loadSource(`http://127.0.0.1:8000/media/output.m3u8`);
//               hls.current.attachMedia(serverVideoRef.current);
  
//               hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
//                 serverVideoRef.current.play();
//               });
//             }
//           } catch (error) {
//             console.error('전송 오류:', error);
//           }
//         };
  
//         reader.readAsArrayBuffer(blob);
//       };
  
//       // MediaRecorder의 상태 확인
//       if (mediaRecorder.current.state === 'inactive') {
//         mediaRecorder.current.start();
//         setTimeout(() => {
//           mediaRecorder.current.stop();
//         }, 2000);  // 10초 동안 녹화
//       } else {
//         console.warn('MediaRecorder is already recording');
//       }
//     };
  
//     const interval = setInterval(startStreaming, 4000);  // 11초 간격으로 실행
  
//     return () => {
//       clearInterval(interval);
//     };
//   }, [sequenceNumber]);

//   const handlePreventDefault = (event) => {
//     event.preventDefault();
//   };

//   return (
//     <div>
//       <h1>카메라 스트리밍</h1>
//       <div style={{ display: 'flex' }}>
//         <div>
//           <h2>로컬 스트리밍</h2>
//           <video ref={localVideoRef} width="320" height="240" autoPlay muted onLoadedMetadata={handlePreventDefault}></video>
//         </div>
//         <div>
//           <h2>서버 스트리밍</h2>
//           <video ref={serverVideoRef} width="320" height="240" autoPlay muted onLoadedMetadata={handlePreventDefault}></video>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client"
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function Home() {
  const videoRef = useRef(null);
  const hls = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (Hls.isSupported()) {
      hls.current = new Hls();

      hls.current.on(Hls.Events.ERROR, function(event, data) {
        console.error('Hls.js 오류 발생:', data);
      });

      hls.current.loadSource(`http://127.0.0.1:8000/media/qudtls.m3u8`);
      hls.current.attachMedia(videoElement);

      hls.current.on(Hls.Events.MANIFEST_PARSED, function() {
        videoElement.play();
      });
    }
  }, []);

  return (
    <div>
      <h1>HLS Streaming with Next.js</h1>
      {/* <video ref={videoRef} controls autoPlay></video> */}
      <video ref={videoRef} controls autoPlay muted></video>

    </div>
  );
}