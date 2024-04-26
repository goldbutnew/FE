'use client'

import React, { useState } from "react";
import BottomSheet from "../BottomSheet";

export default function ChatProfile() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Bottom Sheet</button>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is the content of the Bottom Sheet.</p>
        </BottomSheet>
      )}
    </div>
  );
}