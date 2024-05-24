import React from "react";
import BottomSheet from "../BottomSheet";
import { line } from "@/styles/common.css";
import { FaHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { MdBlock } from "react-icons/md";
import { rowWrapper } from "@/styles/wrapper.css";
import * as styles from './index.css'
import ProfileImage from "../ProfileImg";
import { vars } from "@/styles/vars.css";
import Link from "next/link";
import useChatStore from "./Store";

interface UserData {
  username: string;
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
  const safeUserData = userData || { username: '', nickname: '', introduction: '', thumbnail: '', timeStamp: '' };
  const code = btoa(safeUserData.username);  // 안전한 userData 객체 사용

  const formatDate = (dateString: string) => {
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
              {/* <div className={styles.chatProfileItemBox}> */}
                <div className={styles.chatProfileNickanme}>
                <Link href={`/profile/${code}`}>{userData.nickname}</Link>
                </div>
              {/* </div> */}
            </div>
            <div className={styles.chatProfileIntroduction}>
              {userData.introduction}
            </div>
            <hr className={line}/>
            <div className={rowWrapper}>
              <FaHeart
                size={12}
                color={vars.colors.pink}
              />
              <span className={styles.dateBox}>{formatDate(userData.timeStamp)}</span>
            </div>
            {/* <hr className={line}/>
            <div className={styles.chatProfileItemBox}>
              <div className={styles.userFunctionItem}>
                <FaRegUser 
                  size={16}
                />
                <Link href={`/profile/${code}`}>프로필 보기</Link>
              </div> */}
              {/* <div className={styles.userFunctionItem} onClick={handleBlock}>
                <MdBlock 
                  size={16}
                />
                <span>사용자 차단</span>
              </div> */}
            {/* </div> */}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
