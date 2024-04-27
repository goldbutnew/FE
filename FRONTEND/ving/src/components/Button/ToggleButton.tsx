import React, { useState } from 'react';
import * as styles from './index.css'; // 스타일 파일 import

interface ToggleButtonProps {
  // 필요한 경우 여기에 추가 props를 정의할 수 있습니다.
}

const ToggleButton: React.FC<ToggleButtonProps> = () => {
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`${styles.toggleButton} ${isActive ? styles.toggleButtonActive : ''}`}
      onClick={toggle}
    >
      <div className={`${styles.toggleButtonKnob} ${isActive ? styles.toggleButtonKnobActive : ''}`}></div>
    </div>
  );
};

export default ToggleButton;
