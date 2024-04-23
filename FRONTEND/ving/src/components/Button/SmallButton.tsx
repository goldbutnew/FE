import React from "react";
import { defaultButton } from "./index.css";

type ButtonProps = {
  text: string;
  color: string;
};

export default function Button({ text, color }: ButtonProps) {
  // className에서 smallButton 스타일 적용
  return (
    <button
      className={defaultButton({ size: 'small' })} // 스타일 적용
      style={{ backgroundColor: color, color: 'white' }} // 동적 컬러 적용
    >
      {text}
    </button>
  );
}