import React, { useState } from 'react';
import * as styles from './index.css';

type ChoiceChipProps = {
  label: string;
}

export default function ChoiceChip({ label }: ChoiceChipProps) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
  setIsSelected(!isSelected);
  };

  return (
  <div
    className={`${styles.chip} ${isSelected ? styles.chipVariants.selected : styles.chipVariants.unselected}`}
    onClick={toggleSelection}
  >
    {label}
  </div>
  );
};