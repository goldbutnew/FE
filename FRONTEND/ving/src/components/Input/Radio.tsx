import React, { useState } from "react";
import { rowbox } from "@/styles/box.css";
import * as styles from "./index.css";

interface RadioProps {
  text: string;
}

export default function Radio({ text }: RadioProps) {
  const [checked, setChecked] = useState(false);

  const handleRadioClick = () => {
    setChecked(!checked);
  };

  return (
    <div className={rowbox}>
      <input
        type="radio"
        className={styles.RadioButton}
        checked={checked}
        onClick={handleRadioClick}
      />
      {text}
    </div>
  );
}
