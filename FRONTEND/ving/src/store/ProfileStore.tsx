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
}))

export default useProfileStore