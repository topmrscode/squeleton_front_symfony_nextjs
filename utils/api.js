import Axios from "axios"

let urls = {
  development: process.env.NEXT_PUBLIC_API_BASEURL,
}
const api = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

export default api
