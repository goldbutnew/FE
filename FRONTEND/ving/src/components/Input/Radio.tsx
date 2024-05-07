import React, { useState } from "react";
import { rowbox } from "@/styles/box.css";
import * as styles from "./index.css";

interface RadioProps {
  text: string;
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}

export default function Radio({ text, isActive, onChange }: RadioProps) {

  const handleClick = () => {
    onChange(!isActive);
  };

  return (
    <div className={rowbox} onClick={handleClick}>
      <input
        type="radio"
        className={styles.RadioButton}
        checked={isActive}
      />
      {text}
    </div>
  );
}
