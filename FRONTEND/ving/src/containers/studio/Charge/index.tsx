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
import ChoiceChip from '@/components/Button/ChoiceChip';
import LargeButton from '@/components/Button/LargeButton';
import { formatNumber } from '@/utils/formatNumber';

export default function Charge() {
  const { userData } = useAuthStore();
  const { getUserProfileInfo, profileData } = useProfileStore();
  const { chargeChoco } = useStudioStore();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [initChoco, setInitChoco] = useState(0);
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  useEffect(() => {
    if (userData.username) {
      getUserProfileInfo(userData.username);
    }
  }, [userData.username, getUserProfileInfo]);

  useEffect(() => {
    if (profileData.choco !== undefined) {
      setInitChoco(profileData.choco);
    }
  }, [profileData.choco]);

  const handleChipChange = (label: string) => {
    const numericValue = parseInt(label.replace(',', ''), 10);
    if (numericValue % 100 === 0) {
      setSelectedChip(label);
      setAmount(label.replace(',', ''));
      setError('');  // Reset the error if the value is valid
    } else {
      setError('100초코 단위로만 충전 가능합니다.');
    }
  };

  const handleAmountChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    if (numericValue % 100 === 0 || value === '') {
      setAmount(value);
      setError('');
    } else {
      setAmount(value);
      setError('100초코 단위로만 충전 가능합니다.');
    }
  };

  const handleCharge = async () => {
    const numericValue = parseInt(amount, 10);
    if (isNaN(numericValue) || numericValue <= 0 || numericValue % 100 !== 0) {
      setError('유효한 금액을 입력하세요.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 3초 지연
      await chargeChoco(numericValue);
      setInitChoco(initChoco + numericValue);
      setAmount('');
      setSelectedChip(null);
    } catch (error) {
      setError('충전에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formattedChoco = formatNumber(initChoco);

  return (
    <Container>
      <div className={styles.title}>
        초코 충전
      </div>
      <div className={styles.chargeContainer}>
        <div>
          🍫 보유 초코: {formattedChoco}
        </div>
        <div className={styles.chargeInputBox}>
          <DefaultInput
            type="number"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            placeholder="충전할 초코 금액을 입력하세요"
          />
        </div>
        <div className={styles.chocoChoiceChipBox}>
          <ChoiceChip label='10,000' isSelected={selectedChip === '10,000'} onChange={handleChipChange} />
          <ChoiceChip label='30,000' isSelected={selectedChip === '30,000'} onChange={handleChipChange} />
          <ChoiceChip label='50,000' isSelected={selectedChip === '50,000'} onChange={handleChipChange} />
          <ChoiceChip label='100,000' isSelected={selectedChip === '100,000'} onChange={handleChipChange} />
        </div>
        <div className={styles.errorBox}>
          {error && <span>{error}</span>}
        </div>
        <div className={styles.chargeButtonBox}>
          <LargeButton
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
