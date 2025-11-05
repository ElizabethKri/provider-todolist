import { Navigate, Outlet } from "react-router"
import { ReactNode } from "react"
import { Path } from "@/common/components/routing/Routing.tsx"

type Props = {
  children?: ReactNode
  isAllowed: boolean
  redirectPath?: string
}

export const ProtectedRoutes = ({ children, isAllowed, redirectPath = Path.Login }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} />
  }

  return children ?? <Outlet />
}
