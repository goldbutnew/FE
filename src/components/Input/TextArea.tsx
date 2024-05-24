import React from 'react';
import * as styles from './index.css'

interface TextareaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  maxLength?: number;
  rows?: number;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholder, maxLength, rows }) => {
  return (
    <div className={styles.TextAreaBox}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={styles.TextAreaForm}
      />
      {maxLength && (
        <div className={styles.characterCount}>
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
}

export default Textarea;