import { create } from 'zustand'
import axios from '../../api/axios'

const useStudioStore = create((set) => ({

  isOnAir: false,

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
      console.log('방송 시작 요청 성공', response.data)
      set({ isOnAir: true })

    } catch (error) {
      console.error('방송 시작 요청 실패:', error)
      set({ isOnAir: false })
    }
  },

  // openPort: async () => {
  //   try {
  //     const response = await axios.get('media_pipeline/main')
  //     console.log('포트 개방 성공', response.data)
  //     set({ isOnAir: true })

  //   } catch (error) {
  //     console.error('포트 개방 실패:', error)
  //     set({ isOnAir: false })
  //   }
  // },

  closePort: async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('stream/end', {} , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log('방송 종료 요청 성공', response.data)
      set({ isOnAir: false })

    } catch (error) {
      console.error('방송 종료 요청 실패:', error)
    }
  },

  sendStreamTitle: async (username, title) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/set_streaming_room_name/', {
        username,
        title
      })
      console.log('제목 수정 완료', response.data)

    } catch (error) {
      console.error('제목 수정 실패:', error)
    }
  },
  sendStreamThumbnail: async (username, thumbnail) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/update_streaming_room_thumbnail/', {
        username,
        thumbnail: thumbnail.name
      }, 
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     'Content-type': 'multipart/form-data',
      //   }
      // }
      )
      console.log('썸네일 수정 완료', response.data)

    } catch (error) {
      console.error('썸네일 수정 실패:', error)
    }
  },

  sendStreamLimit: async (username, limit) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch('home/set_streaming_room_is_adult/', {
        username,
        limit
      })
      console.log('연령 제한 설정 완료', response.data)

    } catch (error) {
      console.error('연령 제한 설정 실패:', error)
    }
  },

  staticData: { 
    playCount: 0,
    totalViewer: 0,
    averageViewer: 0,
    maxViewer: 0,
  },
  // 유저 프로필 가져오기
  getStaticPlayCount: async (userName: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        params: { userName },
      })
      set((prev) => ({ ...prev, staticData: { ...prev.staticData, playCount: response.data } }))
    } catch (error) {
      console.error(error)
    }
  },
  getStaticTotalViewer: async (userName: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        params: { userName },
      })
      set((prev) => ({ ...prev, staticData: { ...prev.staticData, totalViewer: response.data } }))
    } catch (error) {
      console.error(error)
    }
  },
  getStaticAverageViewer: async (userName: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        params: { userName },
      })
      set((prev) => ({ ...prev, staticData: { ...prev.staticData, averageViewer: response.data } }))
    } catch (error) {
      console.error(error)
    }
  },
  getStaticMaxViewer: async (userName: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        params: { userName },
      })
      set((prev) => ({ ...prev, staticData: { ...prev.staticData, maxViewer: response.data } }))
    } catch (error) {
      console.error(error)
    }
  }
}))

export default useStudioStore