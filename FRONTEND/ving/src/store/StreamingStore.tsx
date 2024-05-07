import { create } from 'zustand'
import axios from '../api/axios'

const useStreamingStore = create((set) => ({

  streamData:'',

  startStreaming: async (formData: FormData) => {
    console.log(formData, '방정보완성')
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post('stream/tmpCreate', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'multipart/form-data',
        }
      })
      console.log('방송 시작 요청', response.data)

    } catch (error) {
      console.error('방송 시작 요청 실패:', error)
    }
  },

  openPort: async () => {
    try {
      const response = await axios.get('media_pipeline/main')
      console.log('포트 개방 성공', response.data)

    } catch (error) {
      console.error('포트 개방 실패:', error)
    }
  },

  closePort: async (username) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/delete_streaming_room/', {
        username
      })
      console.log('방송 종료 요청 성공', response.data)

    } catch (error) {
      console.error('방송 종료 요청 실패:', error)
    }
  },

  sendStreamTitle: async (roomName) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/set_streaming_room_name/', {
        roomName
      })
      console.log('제목 수정 완료', response.data)

    } catch (error) {
      console.error('제목 수정 실패:', error)
    }
  },
  sendStreamThumbnail: async (thumbNail) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('update_streaming_room_thumbnail/', {
        thumbNail
      })
      console.log('썸네일 수정 완료', response.data)

    } catch (error) {
      console.error('썸네일 수정 실패:', error)
    }
  },

  sendStreamLimit: async (isAdult) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/set_streaming_room_is_adult/', {
        isAdult
      })
      console.log('연령 제한 설정 완료', response.data)

    } catch (error) {
      console.error('연령 제한 설정 실패:', error)
    }
  },
}))

export default useStreamingStore