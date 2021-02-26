import Head from "next/head"
import { Frame } from "@shopify/polaris"
import MenuBar from "./components/MenuBar"
import { useSelector } from "react-redux"

function Layout({ children, title = "Kalburger" }) {
  const user = useSelector((state) => state.auth.user)
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Frame topBar={<MenuBar user={user}></MenuBar>}>{children}</Frame>
    </div>
  )
}

export default Layout
