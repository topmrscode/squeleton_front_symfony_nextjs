import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { register } from "@/data/auth"
import redirection from "@/helpers/redirection"
import RegisterForm from "./form"

import { Page, Card, Layout } from "@shopify/polaris"
import { login } from "../../../../data/auth"
import { loginAction } from "../../../../actions/auth"
const { Section } = Layout

export default function Register() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const defaultValues = useState({
    email: null,
    password: null,
    confirmPassword: null,
  })

  if (user) return redirection(router, "/")

  const onSubmit = (data) => {
    const { email, password, passwordConfirmation } = data
    const registerUser = async () => {
      const result = await register(email, password, passwordConfirmation)
      if (result.code) {
        return setError({
          type: "manual",
          message: result.message,
        })
      }
      const resultLogin = await login(email, password)
      if (result.code) {
        return setError({
          type: "manual",
          message: result.message,
        })
      }
      dispatch(loginAction(resultLogin.user, resultLogin.token))
    }
    registerUser()
  }

  const onLogin = () => router.push("/login")

  return (
    <Page narrowWidth title="Creer un compte">
      <Layout>
        <Section>
          <Card sectioned>
            <RegisterForm
              error={error}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onLogin={onLogin}
            />
          </Card>
        </Section>
      </Layout>
    </Page>
  )
}
