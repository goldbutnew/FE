import { create } from 'zustand'
import axios from '../api/axios' 

interface Data {
  username: string
  password: string
}

const useAuthStore = create((set) => ({
  isLogin: false,
  userData: [],
  isCheck: false,

  login: async (data:Data) => {
    try {
      console.log(data)
      const response = await axios.post('auth/login', data)

      // 유저 데이터 저장
      set({ isLogin: true })
      set({ userData: response.data.info })
      localStorage.setItem('accessToken', response.data.token.accessToken)
      console.log('유저 데이터입니다', response.data)

    } catch (error) {
      console.error('로그인 실패:', error)
    }
  },

  duplicatedCheck: async (username:string) => {
    try {
      console.log(username)
      const response = await axios.get('auth/isRegistered', { 
        params : { username },
      })

      console.log('중복체크 성공', response.data.registered)
      if (response.data.registered) {
        set({ isCheck: false })
      } else {
        set({ isCheck: true })
      }

    } catch (error) {
      console.error('중복체크 실패:', error)
    }
  },

  signup: async (data:Data) => {
    try {
      console.log(data)
      const response = await axios.post('auth/signup', data)

      console.log('유저 데이터입니다', response.data)
      set({ isLogin: true })
      set({ userData: response.data.info })
      localStorage.setItem('accessToken', response.data.token.accessToken)

    } catch (error) {
      console.error('회원가입 실패:', error)
    }
  },
}))

export default useAuthStore