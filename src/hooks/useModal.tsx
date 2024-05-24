'use client'

import { useState, useEffect, useRef } from 'react';

type UseModalReturnType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  modalRef: React.RefObject<HTMLDivElement>; 
};

function useModal(initialState: boolean = false): UseModalReturnType {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const modalRef = useRef<HTMLDivElement>(null); 

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, close])

  return {
    isOpen,
    open,
    close,
    modalRef,
  };
}

export default useModal;
