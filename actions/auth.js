export const authAction = {
  LOGIN: "Login",
  LOGOUT: "Logout",
}

export const loginAction = (user, token) => {
  return {
    type: authAction.LOGIN,
    payload: { user, token },
  }
}

export const logoutAction = () => {
  return {
    type: authAction.LOGOUT,
    payload: {},
  }
}
