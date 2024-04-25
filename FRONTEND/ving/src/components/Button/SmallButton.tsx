import React from "react";
import { defaultButton } from "./index.css";

type ButtonProps = {
  text: string;
  color?: string; 
  onClick?: () => void;
};

export default function SmallButton({ text, color, onClick }: ButtonProps) {
  return (
    <button
      className={defaultButton({ size: 'small' })} 
      style={{ 
        backgroundColor: color === 'defaultColor' ? 'black' : color || 'black',
        color: 'white',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
