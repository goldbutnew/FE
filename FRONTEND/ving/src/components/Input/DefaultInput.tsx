'use clien'

import React, { useState } from 'react';
import * as styles from './index.css';
import { betweenWrapper } from '@/styles/wrapper.css';
import { FaRegFaceSmile } from "react-icons/fa6";

const EmojiButton = ({ onClick }) => (
  <div onClick={onClick} className={styles.emojiButton}>
    <FaRegFaceSmile 
      size={20}
    />
  </div>
);

interface InputProps {
  type: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEmojiClick?: () => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
}

const DefaultInput: React.FC<InputProps> = ({ type, value, onChange, onEmojiClick, placeholder, maxLength, disabled }) => {
  return (
    <div className={`${betweenWrapper} ${styles.defaultInputBox}`}>
      
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        className={styles.defaultInputForm}
      />
      {maxLength && (
        <span className={styles.characterCount}>
          {value.length} / {maxLength}
        </span>
      )}
      {onEmojiClick && 
        <EmojiButton onClick={onEmojiClick} />
      }
    </div>
  );
}

export default DefaultInput;