'use clien'

import React, { useState } from 'react';
import * as styles from './index.css';
import { betweenBox } from '@/styles/box.css';
import { plainButton } from '@/styles/common.css';

const EmojiButton = ({ onClick }) => (
  <button onClick={onClick} className={plainButton}>
    😀
  </button>
);

interface InputProps {
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEmojiClick?: () => void
  placeholder?: string
  maxLength?: number
}

const DefaultInput: React.FC<InputProps> = ({ type, value, onChange, onEmojiClick, placeholder, maxLength }) => {
  return (
    <div className={`${betweenBox} ${styles.defaultInputBox}`}>
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={styles.defaultInputForm}
      />
      {maxLength && (
        <span className={styles.characterCount}>
          {value.length} / {maxLength}
        </span>
      )}
      {onEmojiClick && <EmojiButton onClick={onEmojiClick} />}
    </div>
  );
}

export default DefaultInput;