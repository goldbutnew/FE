import React from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import { FaHeart } from "react-icons/fa";
import { rowWrapper } from "@/styles/wrapper.css";
import * as styles from './index.css'
import ProfileImage from "../ProfileImg";

interface UserData {
  nickname: string;
  introduction: string;
  thumbnail: string;
  timeStamp: string;
}

interface ChatProfileProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData;
}

export default function ChatProfile({ isOpen, onClose, userData }: ChatProfileProps) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일부터 팔로우`;
  };

  return (
    <div>
      {isOpen && (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
          <div>
            <div className={styles.chatProfileContainer}>
              <ProfileImage
                url={userData.thumbnail}
                width={50}
                alt="프로필 이미지"
              />
              <div className={styles.chatProfileItemBox}>
                <div className={styles.chatProfileNickname}>
                  {userData.nickname}
                </div>
                <div className={styles.chatProfileIntroduction}>
                  {userData.introduction}
                </div>
              </div>
            </div>
            <hr className={line}/>
            <div className={rowWrapper}>
              <FaHeart
                size={12}
                color="D16D6A"
              />
              <span className={styles.dateBox}>{formatDate(userData.timeStamp)}</span>
            </div>
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
