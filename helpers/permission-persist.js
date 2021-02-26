import { parseCookies } from "nookies"
import React from "react"
import { useDispatch } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import api from "@/utils/api"
import { logoutAction } from "@/actions/auth"
import { logout } from "@/data/auth"

// handle cookie expired or error JWT
const PermissionAndPersist = ({ persistor, children }) => {
  const dispatch = useDispatch()
  const cookies = parseCookies()

  const fetch = async () => {
    api.defaults.headers.Authorization = `Bearer ${cookies.token}`
    try {
      await api.get("api/me")
    } catch (error) {
      logout()
      dispatch(logoutAction())
    }
  }
  if (cookies) {
    fetch()
  }
  return <PersistGate persistor={persistor}>{children}</PersistGate>
}

export default PermissionAndPersist
