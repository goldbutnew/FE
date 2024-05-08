import { create } from 'zustand'
import axios from '../api/axios'

const useSettingStore = create((set, get) => ({

  // 링크 추가
  doAddLink: async (url:string, title: string) => {
    const token = localStorage.getItem('accessToken')
    console.log(url)
    try {
      const response = await axios.post(`auth/postLink`, 
      { url, title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '링크 추가 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 링크 삭제
  doDeleteLink: async (url:string, title: string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`auth/deleteLink`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { url, title }
      })
      console.log(response, '링크 삭제 성공')
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useSettingStore