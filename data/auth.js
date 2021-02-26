import { setCookie, destroyCookie } from "nookies"
import api from "@/utils/api"

const AUTH_TOKEN = "token"
export const login = async (email, password) => {
  try {
    const result = await api.post("/login", { email, password })
    setCookie(null, AUTH_TOKEN, result.data.token, {
      maxAge: 2 * 24 * 60 * 60,
      path: "/",
    })
    api.defaults.headers.Authorization = `Bearer ${result.data.token}`
    return result.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data
    }
    return error
  }
}

export const logout = () => {
  destroyCookie(null, AUTH_TOKEN, { path: "/" })
  delete api.defaults.headers.Authorization
}

export const register = async (email, password, passwordConfirmation) => {
  try {
    const result = await api.post("/register", {
      email,
      password,
      passwordConfirmation,
    })
    return result.data
  } catch (error) {
    if (error.response && error.response.data.message) {
      return error.response.data
    }
    return error
  }
}
