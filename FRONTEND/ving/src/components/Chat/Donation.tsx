'use client'

import React, { useState } from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import { FaHeart } from "react-icons/fa";
import { rowbox } from "@/styles/box.css";
import * as styles from './index.css'
import { bold } from "@/styles/fonts.css";
import SmallButton from "../Button/SmallButton";
import { vars } from "@/styles/vars.css";

export default function Donation({ isOpen, setIsOpen }) {
  const [choco, setChoco] = useState(0)

  const handleClose = () => {
    setIsOpen(false);
  };

  const sendChoco = (value) => () => {
    setChoco(value);
    console.log(`choco: ${choco}`)
  };

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>후원 test</button>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={handleClose}>
          <div>
            <span className={bold}>후원</span>
            <hr className={line}/>
            <p>🍫 내 초코: {choco}</p>
            <hr className={line}/>
            <div className={styles.selectedChocoBox}>
              <span>🍫 {choco}</span>
            </div>
            <div className={styles.buttonGroup}>
              <SmallButton
                text="1,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(1000)}   
              />
              <SmallButton 
                text="5,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(5000)}  
              />
              <SmallButton
                text="10,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(10000)}    
              />
              <SmallButton
                text="50,000"
                color={vars.colors.lightGray}
                fontColor={vars.colors.black}
                onClick={sendChoco(50000)}   
              />
            </div>
            <hr className={line} />
            <div>
              <div>채팅 읽어 주기</div>
              <div>익명으로 후원하기</div>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}