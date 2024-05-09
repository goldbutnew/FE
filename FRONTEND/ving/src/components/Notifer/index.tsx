'use client'

import React, { useState, useEffect } from "react";
import { FaRegBell } from "react-icons/fa";
import IconButton from "../Button/IconButton";
import useModal from "@/hooks/useModal";
import { IoIosClose, IoMdRefresh } from "react-icons/io";
import * as styles from './index.css'
import useNotiferStore from "./Store";
import { lighLine, line, plainButton } from "@/styles/common.css";
import { rotateAnimation } from "@/styles/animation.css";

export default function Notifer() {
  const { isOpen, open, close, modalRef } = useModal();
  const { myAlarm, getAlarm } = useNotiferStore()
  const [isRefreshing, setRefreshing] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    getAlarm()
  }, [])

  const refreshAlarms = async () => {
    setRefreshing(true);
    setAnimate(true); // 애니메이션 활성화
    await getAlarm();
    setRefreshing(false);
    setTimeout(() => setAnimate(false), 1000); // 애니메이션 후 상태 초기화
  };

  return (
    <div className={styles.iconButtonBox}>
      <div className={styles.iconButton}>
        <IconButton icon={FaRegBell} onClick={open} />
      </div>
      {isOpen && (
        <div ref={modalRef} className={styles.modalBackdrop} onClick={close}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalTitleBox}>
              <span className={styles.modalTitle}>알림함</span>
              <div>
                {/* <IoIosClose
                  onClick={close} 
                  size="20" 
                  className={plainButton}
                /> */}
                <IoMdRefresh
                  onClick={refreshAlarms}
                  size="20"
                  className={animate ? `${rotateAnimation} ${styles.notiferRefreshButton}` : styles.notiferRefreshButton}
                  style={{ pointerEvents: isRefreshing ? 'none' : 'auto' }}
                />
              </div>
            </div>
            <hr className={styles.boldHr} />
            {myAlarm.length > 0 ? (
              myAlarm.map((alarm, index) => {
                let message = "";
                if (alarm.type === "recording") {
                  message = `${alarm.streamer}님의 녹화 영상이 업로드 됐습니다`;
                } else if (alarm.type === "streaming") {
                  message = `${alarm.streamer}님의 스트리밍이 시작되었습니다`;
                } 
                return (
                  <div>
                    <span key={index} className={styles.myAlarmItem}>
                      {message}
                    </span>
                    {index !== myAlarm.length - 1 && <hr className={lighLine} />}
                  </div>
                )})  
            ) : (
              <p>알림이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}