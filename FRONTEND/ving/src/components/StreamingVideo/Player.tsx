
'use client';

import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { PlayerProps } from 'next-video';
import styles from './test.css';

export default function Player(props: PlayerProps) {
  const { src, ...rest } = props;
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing); // 재생 상태 토글
  };

  return (
    <div style={styles.playerWrapper}>
      <ReactPlayer
        ref={playerRef}
        style={styles.reactPlayer}
        url={src}
        playing={playing} // 재생 상태
        width="100%"
        height="100%"
        {...rest}
      />
      <div style={styles.customControls}>
        <button style={styles.button} onClick={handlePlayPause}>
          {playing ? 'Pause' : 'Play'} {/* 버튼 라벨 동적 변경 */}
        </button>
      </div>
    </div>
  );
}