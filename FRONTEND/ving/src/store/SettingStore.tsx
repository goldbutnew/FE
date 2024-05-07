import { create } from 'zustand'
import axios from '../api/axios'

const useSettingStore = create((set, get) => ({

  // 유저 프로필 가져오기
  doAddLink: async (link: string) => {
    const token = localStorage.getItem('accessToken')
    console.log(link)
    try {
      const response = await axios.post(`auth/postLink`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          link
        }
      })
      console.log(response, '링크 추가 성공')
    } catch (error) {
      console.error(error)
    }
  },
  doDeleteLink: async (link: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`auth/deleteLink`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          link
        }
      })
      console.log(response, '링크 추가 성공')
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useSettingStore