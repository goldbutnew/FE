import { create } from 'zustand'
import axios from '../api/axios'

const useProfileStore = create((set, get) => ({
  // 팔로우 관련 axios
  // checkFollowStatus: async ({loading:Boolean isFollowed: Boolean userId:String}) => {
  //   try {
  //     const response = await axios.get(`/api/follow/${userId}`)
  //     setIsFollowed(response.data.isFollowed);
  //   } catch (error) {
  //     setLoading(false)
  //     console.error(error)
  //   } 
  // }
  profileData: {},
  // 유저 프로필 가져오기
  getUserProfileInfo: async (username:String) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { userId : username},
      })
      set({ profileData: response.data })
    } catch (error) {
      console.error(error)
    }
  },
  // 유저 프로필 수정
  patchUserProfileInfo: async (formData: FormData) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch(`auth/fillup`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'multipart/form-data',
        },
      })
      console.log(response, '프로필 수정 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 팔로우 신청 /api/sub/subscript
  doFollowUser: async (userId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(`sub/subscript`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '팔로우 신청 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 팔로우 취소 /api/sub/subscript
  doUnFollowUser: async (userId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`sub/unSubscript`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '팔로우 취소 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 상단 고정 /api/sub/subscript
  doFixVideo: async (videoId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(`video/doFix`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '상단 고정 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 상단 고정 취소 /api/sub/subscript
  doUnFixVideo: async (videoId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`video/undoFix`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '상단 고정 취소 성공')
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useProfileStore