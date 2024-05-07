import {create} from 'zustand'
import axios from '../../api/axios'

const useNotiferStore = create((set, get) => ({
  myAlarm: [],

  getAlarm: async () => {
    const token = localStorage.getItem('accessToken'); // 오타 수정
    if (!token) {
      console.log("토큰이 없습니다.");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/api/stream/getAlarm`, { // baseURL 확인
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('요청 성공', response.data);
      set({ myAlarm: response.data.alarms });
    } catch (error) {
      console.error('알림 데이터 요청 실패:', error);
    }
  },
}));

export default useNotiferStore