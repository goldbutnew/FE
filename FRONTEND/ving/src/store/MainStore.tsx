import { create } from 'zustand'
import axios from '../api/axios'


const useMainStore = create((set) => ({
  streamData: [],

  getStreamInfo: async () => {
    try {
      const response = await axios.get('stream/findAll')
      console.log('생방송 목록 가져오기 성공', response.data)
      set({ streamData: response.data.streamRooms })

    } catch (error) {
      console.error('생방송 목록 가져오기 실패:', error)
    }
  },

}))

export default useMainStore