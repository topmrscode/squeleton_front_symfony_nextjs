import { useState } from "react"
import { useDispatch } from "react-redux"

import { logout } from "@/data/auth"
import { logoutAction } from "@/actions/auth"

import { TopBar } from "@shopify/polaris"
import { LogOutMinor } from "@shopify/polaris-icons"
import { useRouter } from "next/router"
const { UserMenu } = TopBar

const MenuBar = ({ user }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const toggleIsUserMenuOpen = () =>
    setIsUserMenuOpen((isUserMenuOpen) => !isUserMenuOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = async () => {
    logout()
    dispatch(logoutAction())
  }

  const userMenuMarkup = user && (
    <UserMenu
      actions={[
        {
          items: user.roles.includes("ROLE_ADMIN") && [
            {
              content: "Admin",
              onAction: () => {
                router.push("/admin")
              },
            },
          ],
        },
        {
          items: [
            {
              icon: LogOutMinor,
              content: "Déconnexion",
              onAction: handleLogout,
            },
          ],
        },
      ]}
      open={isUserMenuOpen}
      onToggle={toggleIsUserMenuOpen}
    />
  )
  return <TopBar userMenu={userMenuMarkup} />
}

export default MenuBar
