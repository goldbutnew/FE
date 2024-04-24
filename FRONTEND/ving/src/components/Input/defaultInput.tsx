import React from 'react';
import * as styles from './index.css';
import { betweenBox } from '@/styles/box.css';

interface InputProps {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
}

const DefaultInput: React.FC<InputProps> = ({ type, value, onChange, placeholder, maxLength }) => {
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
    </div>
  );
}

export default DefaultInput;