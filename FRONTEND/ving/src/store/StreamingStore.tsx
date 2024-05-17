import { create } from 'zustand'
import axios from '../api/axios'
import { persist } from 'zustand/middleware'

const useStreamingStore = create(persist((set, get) => ({
  streamRoomsData: [],
  streamRoomData: '',
  currentTopViewersStreamer: [],
  isStreamerFollowed: true,
  setIsStreamerFollowed: (isFollowed:boolean) => set({ isFollowed: isFollowed }),
  setStreamRoomData: (data: Object) => set({ streamRoomData: data }),
  setCurrentTopViewersStreamer: (data: Object[]) => set({ currentTopViewersStreamer: data }),
  getStreamInfo: async () => {
    try {
      const response = await axios.get('stream/findAll')
      console.log('생방송 목록 가져오기 성공', response.data)
      set({ streamRoomsData: response.data.streamRooms })

    } catch (error) {
      console.error('생방송 목록 가져오기 실패:', error)
    }
  },

  isPlaying: false,
  setIsPlaying: (bool:boolean) => set({ isPlaying: bool }),
}), {
  name: 'streaming-store',
  partialize: (state: any) => ({ streamRoomData: state.streamRoomData, currentTopViewersStreamer: state.currentTopViewersStreamer })
}))

export default useStreamingStore