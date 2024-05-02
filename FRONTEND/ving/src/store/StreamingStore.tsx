import { create } from 'zustand'
// import axios from '../api/axios'
import axios from 'axios'

const useStreamingStore = create((set) => ({

  streamData:'',

  openPort: async (tmp) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('http://k10a203.p.ssafy.io:3000/api/stream/createRoom', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          tmp
        }
      })
      console.log('방송 시작 요청', response.data)

    } catch (error) {
      console.error('방송 시작 요청 실패:', error)
    }
  },

  sendStreamTitle: async (roomName) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('http://k10a203.p.ssafy.io:3000/home/set_streaming_room_name/int:room_id/', {
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
      const response = await axios.patch('http://k10a203.p.ssafy.io:3000/update_streaming_room_thumbnail/int:room_id/', {
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
      const response = await axios.patch('http://k10a203.p.ssafy.io:3000/home/set_streaming_room_is_adult/int:room_id/', {
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