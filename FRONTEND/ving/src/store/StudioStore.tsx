import { create } from 'zustand'
import axios from '../api/axios'

const useStudioStore = create((set, get) => ({

  staticData: { 
    playCount: 0,
    totalViewer: 0,
    averageViewer: 0,
    averageViewer: 0,
  },
  // 유저 프로필 가져오기
  getStaticPlayCount: async (userName: string) => {
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYSI6Im1haW4iLCJlIjoiYmFsb28zNjYiLCJleHAiOjE3MTQ0MzUzOTN9.zWwQzKVwUZypAIs_POg5lxOhoHWwe4q2ZJCW6pfI8eo'
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYSI6Im1haW4iLCJlIjoiYmFsb28zNjYiLCJleHAiOjE3MTQ0MzUzOTN9.zWwQzKVwUZypAIs_POg5lxOhoHWwe4q2ZJCW6pfI8eo'
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYSI6Im1haW4iLCJlIjoiYmFsb28zNjYiLCJleHAiOjE3MTQ0MzUzOTN9.zWwQzKVwUZypAIs_POg5lxOhoHWwe4q2ZJCW6pfI8eo'
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYSI6Im1haW4iLCJlIjoiYmFsb28zNjYiLCJleHAiOjE3MTQ0MzUzOTN9.zWwQzKVwUZypAIs_POg5lxOhoHWwe4q2ZJCW6pfI8eo'
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