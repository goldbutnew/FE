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
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImEiOiJtYWluIiwiZSI6IjEyMyIsImV4cCI6MTcxNDY5OTM4MH0.LwLA-HWY3YF8hehQf4JSBLy82ZS_c0EQk5t3r6wGhmA',
  profileData: {},
  // 유저 프로필 가져오기
  getUserProfileInfo: async (username:number) => {
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImEiOiJtYWluIiwiZSI6IjEyMyIsImV4cCI6MTcxNDYzNTkyMX0.9SDti6Izk0v5ATmboPVPjvO-ergUOy5wVCniF7MQJj0'
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImEiOiJtYWluIiwiZSI6IjEyMyIsImV4cCI6MTcxNDYzNTkyMX0.9SDti6Izk0v5ATmboPVPjvO-ergUOy5wVCniF7MQJj0'
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImEiOiJtYWluIiwiZSI6IjEyMyIsImV4cCI6MTcxNDYzNTkyMX0.9SDti6Izk0v5ATmboPVPjvO-ergUOy5wVCniF7MQJj0'
    try {
      const response = await axios.post(`/api/sub/subscript`, {
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
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMCIsImEiOiJtYWluIiwiZSI6IjEyMyIsImV4cCI6MTcxNDYzNTkyMX0.9SDti6Izk0v5ATmboPVPjvO-ergUOy5wVCniF7MQJj0'
    try {
      const response = await axios.delete(`/api/sub/unSubscript`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '팔로우 취소 성공')
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useProfileStore