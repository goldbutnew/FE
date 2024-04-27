import React from 'react'
import * as styles from './index.css'

interface ToggleButtonProps {
  isActive: boolean
  onChange: (isActive: boolean) => void
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isActive, onChange }) => {
  const toggle = () => {
    onChange(!isActive)
  }

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

