import create from 'zustand';
import axios from '../../api/axios';

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

interface ChatProfile {
  username: string;
  nickname: string;
  introduction: string;
  thumbnail: string;
  timeStamp: string;
}

interface ChatStore {
  messages: Message[];
  addMessage: (message: Message) => void;
  sendDonation: (donationData: DonationRequest) => Promise<void>;
  getChatProfile: (streamer: string, viewer: string) => Promise<ChatProfile | undefined>;
  requestBlock: (donationData: DonationRequest) => Promise<void>;
}

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  selectedUserData: null,
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
  },

  getChatProfile: async (streamer: string, viewer: string) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Access token is missing');
      return;
    }
    try {
      const url = `sub/chatDetail?streamer=${streamer}&viewer=${viewer}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data) {
        console.log('Chat profile fetched successfully:', response.data);
        set({ selectedUserData: response.data });  // Zustand 스토어에 저장
        return response.data;  // 필요한 경우 반환 값으로도 제공
      }
    } catch (error) {
      console.error('Failed to fetch chat profile:', error);
    }
  },

//   requestBlock: async (username: string) => {
//     const token = localStorage.getItem('accessToken');
//     if (!token) {
//       console.error('Access token is missing');
//       return;
//     }
//     try {
//       const url = `home/update_user_blocked_status/`;
//       const response = await axios.patch(url, {
//         username: username,
//         isBlocked: true  // isBlocked 상태를 true로 설정
//       }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         },
//       });
//       if (response.data) {
//         console.log('Block status updated successfully:', response.data);
//         return response.data;
//       }
//     } catch (error) {
//       console.error('Failed to update block status', error);
//     }
//   }
}));

export default useChatStore;
