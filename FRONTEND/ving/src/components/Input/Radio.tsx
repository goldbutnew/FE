import React from "react";
import { rowbox } from "@/styles/box.css";
import * as styles from "./index.css"

interface RadioProps {
  text: string;
  onClick?: () => void;
}
export default function Radio({text, onClick}: RadioProps) {
  return (
    <div className={rowbox}>
      <input type="radio" 
        className={styles.RadioButton}
      />
      {text}
    </div>
  )
}