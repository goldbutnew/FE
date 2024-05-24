import React from 'react';
import * as styles from './index.css';

type ChoiceChipProps = {
  label: string;
  isSelected: boolean;
  onChange: (label: string) => void;
}

export default function ChoiceChip({ label, isSelected, onChange }: ChoiceChipProps) {
  const toggleSelection = () => {
    onChange(label);
  };

  return (
    <div
      className={[styles.chip, isSelected ? styles.chipVariants.selected : styles.chipVariants.unselected].join(' ')}
      onClick={toggleSelection}
    >
      {label}
    </div>
  );
}
