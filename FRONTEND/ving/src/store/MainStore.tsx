import { create } from 'zustand'
import axios from '../api/axios'


const useMainStore = create((set) => ({
  onAirData: [],

  getOnAirInfo: async (username) => {
    try {
      const response = await axios.get('/stream/getOnAir', { 
        params : { username },
      })
      console.log('생방송 목록 가져오기 성공', response.data)
      set({ onAirData: response.data.videos })

    } catch (error) {
      console.error('생방송 목록 가져오기 실패:', error)
    }
  },

}))

export default useMainStore