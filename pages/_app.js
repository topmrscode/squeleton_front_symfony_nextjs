import { useStore } from "react-redux"
import { wrapper } from "@/lib/store"
import Layout from "@/components/Layout"
import PermissionAndPersist from "../helpers/permission-persist"
import { AppProvider } from "@shopify/polaris"
import fr from "@shopify/polaris/locales/fr.json"
import { theme } from "@/styles/index"
import "@shopify/polaris/dist/styles.css"
import "@/styles/overrides.css"

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state)
  return (
    <PermissionAndPersist persistor={store.__persistor}>
      <AppProvider theme={theme} i18n={fr}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </PermissionAndPersist>
  )
}
export default wrapper.withRedux(MyApp)
