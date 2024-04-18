"use client"
import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';

const Home = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hls/');
        
      } catch (err) {
        
      }
    };
    const videoElement = videoRef.current;
    
    if (videoElement) {
      const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        preload: 'auto',
      });

      player.src({
        src: 'http://localhost:8000/media/output.m3u8',
        type: 'application/x-mpegURL',
      });

      player.play();
    }
  }, []);

  return (
    <div>
      <video ref={videoRef} id="my-video" className="video-js vjs-default-skin" />
    </div>
  );
};

//   const videoRef = useRef(null);

//   useEffect(() => {
//     console.log('useEffect is running');

//     const videoElement = videoRef.current;
//     console.log('videoElement:', videoElement);

//     if (videoElement && videoElement.parentElement) {
//       const player = videojs(videoElement, {
//         controls: true,
//         autoplay: false,
//         preload: 'auto',
//         html5: {
//           hls: {
//             overrideNative: true,  // Force Video.js to use HLS
//           },
//         },
//       });
//       console.log('player:', player);

//       player.src({
//         src: 'http://localhost:8000/media/output.m3u8',
//         type: 'application/x-mpegURL',
//       });

//       player.on('play', () => {
//         console.log('Video is playing');
//       });

//       player.on('error', (error) => {
//         console.error('Video.js error:', error);
//       });

//       player.on('loadeddata', () => {
//         console.log('Loaded data:', player.currentTime());
//       });

//       player.on('loadedmetadata', () => {
//         console.log('Loaded metadata:', player.duration());
//         player.play().catch((error) => {
//           console.error('Auto-play failed:', error);
//         });
//       });

//       return () => {
//         if (player) {
//           player.dispose();
//         }
//       };
//     }
//   }, []);

//   console.log('Home component rendered');

//   return (
//     <div>
//       <video ref={videoRef} className="video-js vjs-default-skin" />
//     </div>
//   );
// };

export default Home;


