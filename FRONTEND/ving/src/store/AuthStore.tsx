import { create } from 'zustand'
import axios from 'axios'

interface Data {
  userName: string
  password: string
}

const useAuthStore = create((set) => ({
  isLogin: false,
  userData: '',

  // axios 예시 코드 (로그인을 위해서는 수정 필요)
  login: async (data:Data) => {
    try {
      const response = await axios.post('/api/auth/login', data)

      // 유저 데이터 저장
      set({ isLogin: true })
      set({ userData: response.data.data })
      localStorage.setItem('accessToken', response.data.data.token.accessToken)
      console.log('유저 데이터입니다', response.data.data)

    } catch (error) {
      console.error('로그인 실패:', error)
      set({ isLogin: false, userData: '' })
    }
  },
  
}))

export default useAuthStore