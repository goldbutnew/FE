import { create } from 'zustand'
import axios from '../api/axios'
import { persist } from "zustand/middleware"

interface Data {
  username: string
  password: string
}

const useAuthStore = create(
  persist(
    (set, get) => ({
      Token: null,
      userData: [],
      isCheck: false,

      login: async (data:Data) => {
        try {
          console.log(data)
          const response = await axios.post('auth/login', data)

          set({ userData: response.data.info })
          localStorage.setItem('accessToken', response.data.token.accessToken)
          console.log('유저 데이터입니다', response.data)

        } catch (error) {
          console.error('로그인 실패:', error)
        }
      },

      logout: async () => {
        try {
          localStorage.removeItem('accessToken')
          set({ Token: '' })
          set({ userData: [] })
          useAuthStore.persist.clearStorage
          console.log('로그아웃 완료')

        } catch (error) {
          console.error('로그아웃 실패:', error)
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

          localStorage.setItem('accessToken', response.data.token.accessToken)
          set({ userData: response.data.info })
          set({ Token: response.data.token.accessToken })
          console.log('유저 데이터입니다', response.data)

        } catch (error) {
          console.error('회원가입 실패:', error)
        }
      },
    }),
    {
      name: "userIdStorage",
    }
  )
)

export default useAuthStore