import {create} from 'zustand'
import axios from 'axios'

const useNotiferStore = create((set, get) => ({

  myAlarm: [],

  getAlarm: async () => {
    const token = localStorage.getItem('acessToken')
    try {
      const response = await axios.get(`stream/getAlarm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log('요청 성공', response.data)
      set({ myAlarm: response.data })
    } catch (error) {
      console.log(error)
    }
  },
}))

export default useNotiferStore