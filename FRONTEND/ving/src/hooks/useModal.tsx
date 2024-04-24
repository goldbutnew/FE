'use client'

import { useState } from 'react';

type UseModalReturnType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

function useModal(initialState: boolean = false): UseModalReturnType {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
  };
}

export default useModal;
