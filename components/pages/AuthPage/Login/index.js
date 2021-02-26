import { useRouter } from "next/router"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { loginAction } from "@/actions/auth"
import { login } from "@/data/auth"

import redirection from "@/helpers/redirection"
import LoginForm from "./form"

import { Page, Card, Layout } from "@shopify/polaris"
const { Section } = Layout

export default function Login() {
  const router = useRouter()
  const [error, setError] = useState(null)
  const user = useSelector((state) => state.auth.user)
  const defaultValues = useState({ email: null, password: null })
  const dispatch = useDispatch()

  if (user) return redirection(router, "/")

  const onSubmit = (data) => {
    const { email, password } = data
    console.log(data)
    const loginUser = async () => {
      const result = await login(email, password)
      if (result.code) {
        return setError({
          type: "manual",
          message: result.message,
        })
      }
      console.log(result)
      dispatch(loginAction(result.user, result.token))
    }
    loginUser()
  }
  const onRegister = () => router.push("/register")

  return (
    <Page narrowWidth title="Connexion">
      <Layout>
        <Section>
          <Card sectioned>
            <LoginForm
              error={error}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onRegister={onRegister}
            />
          </Card>
        </Section>
      </Layout>
    </Page>
  )
}
