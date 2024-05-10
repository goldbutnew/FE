// useChatStore.ts
import create from 'zustand';
import axios from '../../api/axios'; // axios 경로는 실제 경로에 맞게 조정해야 합니다.
import { getFormattedTimestamp } from "@/utils/dateUtils";

interface Message {
  userName: string;
  nickname: string;
  timestamp: string;
  donation: number;
  isTts: boolean;
  text: string;
  color?: string;
}

interface DonationRequest {
  username: string;
  choco: number;
  isTts: boolean;
  message: string;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  sendDonation: (donationData: DonationRequest) => Promise<void>;
}

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  addMessage: (message: Message) => set(state => ({ messages: [...state.messages, message] })),
  sendDonation: async (donationData) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is missing');
      return;
    }
    try {
      const response = await axios.patch(`sub/donation`, donationData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        console.log('Donation successful:', response.data);
      }
    } catch (error) {
      console.error('Donation failed:', error);
    }
  }
}));

export default useChatStore;
