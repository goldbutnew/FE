import { create } from 'zustand'
import axios from '../api/axios'

const useStreamingStore = create((set) => ({

  streamData:'',

  openPort: async (tmp) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('stream/createRoom', {
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

  closePort: async (username) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete('stream/createRoom', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          username
        }
      })
      console.log('방송 종료 요청', response.data)

    } catch (error) {
      console.error('방송 종료 요청 실패:', error)
    }
  },

  sendStreamTitle: async (new_name) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/set_streaming_room_name/int:room_id/', {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        body: {
          new_name
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
      const response = await axios.patch('update_streaming_room_thumbnail/int:room_id/', {
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
      const response = await axios.patch('home/set_streaming_room_is_adult/int:room_id/', {
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