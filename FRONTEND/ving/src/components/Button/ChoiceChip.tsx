import React, { useState } from 'react';
import * as styles from './index.css';

type ChoiceChipProps = {
  label: string;
  onChange: (label: string) => void;
}

export default function ChoiceChip({ label, onChange }: ChoiceChipProps) {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelection = () => {
    setIsSelected(!isSelected);
    onChange(label);
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