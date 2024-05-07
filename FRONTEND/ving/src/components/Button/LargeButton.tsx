import React from "react";
import { defaultButton } from "./index.css";

type ButtonProps = {
  text: string;
  color?: string; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function LargeButton({ text, color, onClick }: ButtonProps) {
  return (
    <button
      className={defaultButton({ size: 'large' })} 
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
