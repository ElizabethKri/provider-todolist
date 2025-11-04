import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { Login } from "@/features/auth/ui/Login/Login.tsx"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { Faq } from "@/common/components/Faq/Faq.tsx"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path={Path.Main} element={<Main />} />
        <Route path={Path.Faq} element={<Faq />} />
        <Route path={Path.Login} element={<Login />} />
        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
