import React from "react";
import * as styles from './index.css'

interface ProfileImageProps {
  url: string;
  width: number;
  alt?: string;
}

export default function ProfileImage({url, width, alt}: ProfileImageProps) {
  const height = width;

  return (
    <div>
      <img 
        src={url} 
        className={styles.ProfileImage} 
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  )
}