import { authAction } from "@/actions/auth"

const initialState = {
  user: null,
  token: null,
}
export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case authAction.LOGIN:
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      }
    case authAction.LOGOUT:
      return {
        ...initialState,
      }
    default:
      return state
  }
}
