'use client'

import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import { FaHeart } from "react-icons/fa";
import { rowbox } from "@/styles/box.css";
import * as styles from './index.css'

export default function ChatProfile({ isOpen, onClose, userData }) {
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
          <div>
            <span>
              {userData.nickname}
            </span>
            <hr className={line}/>
            <div className={rowbox}>
              <FaHeart
                size={12}
                color="D16D6A"
              />
              <span className={styles.dateBox}>2023년 12월 22일부터 팔로우</span>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}