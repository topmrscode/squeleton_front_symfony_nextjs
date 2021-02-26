// pages/users/[id]

// import User from "../components/pages/HomePage"
// import axios from "axios"

// export default function UserPage({ user }) {
//   return <User users={users} />
// }

// export async function getStaticProps(context) {
//   const user = await axios.get(
//     `http://localhost:8000/api/users/${context.params.id}`
//   )
//   return {
//     props: {
//       user,
//     },
//   }
// }
// export async function getStaticPaths() {
//   const res = await axios.get("http://localhost:8000/api/users")
//   const users = res.data

//   const ids = res.map((user) => {
//     return {
//       params: { id: user._id },
//     }
//   })

//   return {
//     paths: ids,
//     fallback: false, // or true si id pas gerer
//   }
// }

// pages/users

// import Users from "../../components/pages/HomePage"
// import axios from "axios"

// export default function UsersPage({ users }) {
//   return <Users users={users} />
// }

// export async function getStaticProps() {
//   const res = await axios.get("http://localhost:8000/api/users")
//   const users = res.data

//   return {
//     props: {
//       users,
//     },
//   }
// }

// import "@shopify/polaris/dist/styles.css"
// import { theme } from "@/styles/index"
// import { AppProvider } from "@shopify/polaris"
// import fr from "@shopify/polaris/locales/fr.json"
// import { Provider } from "react-redux"
// import { useStore } from "../store"
// import api from "../utils/api"
// import { parseCookies } from "nookies"

// const getAuthenticatedUser = async (ctx) => {
//   const { token } = parseCookies(ctx)
//   if (token) {
//     api.defaults.headers.Authorization = `Bearer ${token}`
//     try {
//       const fetchedUser = await api.get("api/me")

//       return { user: fetchedUser.data, token }
//     } catch (error) {
//       return { user: null, token: null }
//     }
//   }
//   return { user: null, token: null }
// }

// const MyApp = ({ Component, pageProps, user, token }) => {
//   const store = useStore({
//     authReducer: {
//       user: user !== undefined ? user : null,
//       token: token !== undefined ? token : null,
//     },
//   })
//   return (
//     <Provider store={store}>
//       <AppProvider theme={theme} i18n={fr}>
//         <Component {...pageProps} />
//       </AppProvider>
//     </Provider>
//   )
// }

// MyApp.getInitialProps = async ({ Component, ctx }) => {
//   const isFromServer = !process.browser
//   let pageProps = {}
//   let ssrProps = {}
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   ssrProps = await getAuthenticatedUser(ctx)
//   return { pageProps, ...ssrProps }
// }
// export default MyApp
