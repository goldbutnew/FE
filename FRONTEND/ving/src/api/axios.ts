import axios from "axios"

const instance = axios.create({
  // baseURL: "http://k10a203.p.ssafy.io:8000/api/",
  baseURL: "http://k10a203.p.ssafy.io:8080/api/",
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance