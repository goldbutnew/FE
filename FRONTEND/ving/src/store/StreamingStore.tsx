import { create } from 'zustand'
import axios from '../api/axios'
import { persist } from 'zustand/middleware'


const useStreamingStore = create((set) => ({
  streamRoomsData: [],
  streamRoomData: '',
  setStreamRoomData: (data: Object) => set({ setStreamRoomData: data }),
  getStreamInfo: async () => {
    try {
      const response = await axios.get('stream/findAll')
      console.log('생방송 목록 가져오기 성공', response.data)
      set({ streamData: response.data.streamRooms })

    } catch (error) {
      console.error('생방송 목록 가져오기 실패:', error)
    }
  },

}), {
  name: 'streamRoom-store',
  getStorage: () => localStorage,  
  partialize: (state:any) => ({ streamRoomTitle: state.streamRoomTitle }),
}))

export default useStreamingStore