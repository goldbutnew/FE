import axios from "axios"

const instance = axios.create({
  baseURL: "http://k10a203.p.ssafy.io/api/",
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance