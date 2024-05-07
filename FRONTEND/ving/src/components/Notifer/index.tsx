'use client'

import React, { useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import useModal from "@/hooks/useModal";
import { IoIosClose } from "react-icons/io";
import * as styles from './index.css'
import { bold } from "@/styles/fonts.css";
import useNotiferStore from "./Store";

export default function Notifer() {
  const { isOpen, open, close, modalRef } = useModal();
  const { myAlarm, getAlarm } = useNotiferStore()

  useEffect(() => {
    getAlarm()
  }, [])

  return (
    <div className={styles.iconButtonBox}>
      <div className={styles.iconButton}>
        <IconButton icon={FaRegBell} onClick={open} />
      </div>
      {isOpen && (
        <div ref={modalRef} className={styles.modalBackdrop} onClick={close}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.closeBtnBox}>
              <span className={bold}>알림함</span>
              <IoIosClose
                onClick={close} 
                size="20" 
                className={styles.closeButton}
              />
            </div>
            {myAlarm.length > 0 ? (
              myAlarm.map((alarm, index) => (
                <p key={index}>{alarm.message}</p> // 알림 메시지 출력
              ))
            ) : (
              <p>알림이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}