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
  getUserProfileInfo: async (nickname:number) => {
    // const token = await AsyncStorage.getItem('accessToken')
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4IiwiYSI6Im1haW4iLCJlIjoiYmFsb28zNjYiLCJleHAiOjE3MTQ0MzUzOTN9.zWwQzKVwUZypAIs_POg5lxOhoHWwe4q2ZJCW6pfI8eo'
    try {
      const response = await axios.get(`auth/getProfile?userId=${nickname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      set({ profileData: response.data })
    } catch (error) {
      console.error(error)
    }
  }
}))

export default useProfileStore