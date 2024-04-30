import { create } from 'zustand'
import axios from '../api/axios'

const useStreamingStore = create((set) => ({

  streamData:'',
  sendStreamTitle: async (roomName) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('url', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          roomName
        }
      })
      console.log('제목 수정 완료', response.data)

    } catch (error) {
      console.error('제목 수정 실패:', error)
    }
  },
  sendStreamThumbnail: async (thumbNail) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('url', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          thumbNail
        }
      })
      console.log('썸네일 수정 완료', response.data)

    } catch (error) {
      console.error('썸네일 수정 실패:', error)
    }
  },
  sendStreamLimit: async (isAdult) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('url', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          isAdult
        }
      })
      console.log('연령 제한 설정 완료', response.data)

    } catch (error) {
      console.error('연령 제한 설정 실패:', error)
    }
  },
}))

export default useStreamingStore