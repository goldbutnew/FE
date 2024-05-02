import React from "react";
import { defaultButton } from "./index.css";

type ButtonProps = {
  text: string;
  color?: string;
  fontColor?: string; 
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function SmallButton({ text, color, fontColor, onClick }: ButtonProps) {
  return (
    <button
      className={defaultButton({ size: 'small' })} 
      style={{ 
        backgroundColor: color === 'defaultColor' ? 'black' : color || 'black',
        color: color === 'defaultColor' ? 'white' : fontColor || 'white',
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
