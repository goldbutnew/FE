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
  searchData: [],
  currentTopViewersData: [],
  profileUserName: '',
  // 유저 프로필 가져오기
  getUserProfileInfo: async (username:string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`auth/getProfile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { username : username},
      })
      set({ profileData: response.data,
        profileUserName: username
      })
    } catch (error) {
      console.error(error)
    }
  },
  // 유저 검색 자동완성
  getUserNicknameSearch: async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`search/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      set({ searchData: response.data.users })
      console.log('-------------', response.data)
    } catch (error) {
      console.error(error)
    }
  },
  // 현재 시청자 수 랭킹 가져오기
  getCurrentTopViewers: async () => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.get(`search/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      set({ currentTopViewersData: response.data.users })
      console.log('-------------', response.data)
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
  doFollowUser: async (username:string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(`sub/subscript`,   
      { username },
      {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '팔로우 신청 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 팔로우 취소 /api/sub/unSubscript
  unDoFollowUser: async (username:string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`sub/unSubscript`,  {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { username: username }
      })
      console.log(response, '팔로우 취소 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 알림 켜고 끄기
  doChangeAlarm: async (username:string) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.patch(`sub/changeAlarm`, 
      { username }, 
      {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(response, '알림 켜고 끄기 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 상단 고정 /api/sub/subscript
  doFixVideo: async (videoId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.post(`video/doFix`, 
      { videoId },
      {
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
  unDoFixVideo: async (videoId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`video/undoFix`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { videoId: videoId }
      })
      console.log(response, '상단 고정 취소 성공')
    } catch (error) {
      console.error(error)
    }
  },
  // 비디오 삭제 
  doDeleteVideo: async (videoId:number) => {
    const token = localStorage.getItem('accessToken')
    try {
      const response = await axios.delete(`video/delete`, 
      {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: { videoId: videoId }
      })
      console.log(response, '비디오 삭제 성공')
    } catch (error) {
      console.error(error)
    }
  },
}))

export default useProfileStore