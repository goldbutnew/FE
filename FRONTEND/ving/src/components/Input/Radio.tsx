import React, { useState } from "react";
import { rowbox } from "@/styles/box.css";
import * as styles from "./index.css";

interface RadioProps {
  text: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Radio({ text, checked, onChange }: RadioProps) {

  return (
    <div className={rowbox}>
      <input
        type="radio"
        className={styles.RadioButton}
        checked={checked}
        onChange={onChange}
      />
      {text}
    </div>
  );
}
