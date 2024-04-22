import { create } from 'zustand'
import axios from 'axios'

const useLoginStore = create((set) => ({
  isLogin: false,
  userData: '',

  // axios 예시 코드 (로그인을 위해서는 수정 필요)
  login: async (token:string) => {
    try {
      const response = await axios.get('url', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      // 유저 데이터 저장
      set({ isLogin: true })
      set({ userData: response.data.data.info })
      console.log('유저 데이터입니다', response.data.data.info)

    } catch (error) {
      console.error('로그인 실패:', error)
      set({ isLogin: false, user: null })
    }
  },
  
}))

export default useLoginStore