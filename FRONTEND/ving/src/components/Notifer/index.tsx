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
              myAlarm.map((alarm, index) => {
                let message = "";
                if (alarm.type === "recording") {
                  message = `${alarm.streamer}님의 녹화 영상이 업로드 됐습니다`;
                } else if (alarm.type === "streaming") {
                  message = `${alarm.streamer}님의 스트리밍이 시작되었습니다`;
                } else {
                  message = "알림 유형을 알 수 없습니다";
                }
                return <p key={index}>{message}</p>;
              })
            ) : (
              <p>알림이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}