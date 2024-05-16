'use client';

import React, { useState, useEffect } from 'react';
import Container from "@/components/Container";
import * as styles from '../index.css';
import useAuthStore from '@/store/AuthStore';
import useProfileStore from '@/store/ProfileStore';
import useStudioStore from '../Store';
import SmallButton from '@/components/Button/SmallButton';
import { vars } from '@/styles/vars.css';
import DefaultInput from '@/components/Input/DefaultInput';

export default function Charge() {
  const { userData } = useAuthStore();
  const { getUserProfileInfo, profileData } = useProfileStore();
  const { chargeChoco } = useStudioStore();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initChoco, setInitChoco] = useState(0);

  useEffect(() => {
    getUserProfileInfo(userData.username)
    if (profileData.choco) {
      setInitChoco(profileData.choco);
    }
  }, [profileData.choco]);

  const handleCharge = async () => {
    if (isNaN(amount) || amount <= 0) {
      setError('유효한 금액을 입력하세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await chargeChoco(Number(amount));
      setInitChoco(initChoco + Number(amount));
      setAmount('');
    } catch (error) {
      setError('충전에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className={styles.title}>
        초코 충전
      </div>
      <div className={styles.chargeContainer}>
        <span>현재 초코: {initChoco}</span>
        <div className={styles.chargeInputBox}>
          <DefaultInput
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="충전할 초코 금액을 입력하세요"
          />
        </div>
        <div className={styles.errorBox}>
          {error && <span>{error}</span>}
        </div>
        <div className={styles.buttonGroupContainer}>
          <SmallButton
            text={loading ? '충전 중...' : '충전하기'}
            color={vars.colors.black}
            onClick={handleCharge}
            disabled={loading}
          />          
        </div>
      </div>
    </Container>
  );
}
