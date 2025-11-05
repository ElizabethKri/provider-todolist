import { Route, Routes } from "react-router"
import { Main } from "@/app/Main.tsx"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { Faq } from "@/common/components/Faq/Faq.tsx"
import { ProtectedRoutes } from "@/common/components/ProtectedRoutes/ProtectedRoutes.tsx"
import { useAppSelector } from "@/common/hooks"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Login } from "@/features/auth/ui/Login/Login.tsx"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  return (
    <div>
      <Routes>
        <Route element={<ProtectedRoutes isAllowed={isLoggedIn} />}>
          <Route path={Path.Main} element={<Main />} />
          <Route path={Path.Faq} element={<Faq />} />
        </Route>

        <Route element={<ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main} />}>
          <Route path={Path.Login} element={<Login />} />
        </Route>

        <Route path={Path.NotFound} element={<PageNotFound />} />

        {/*  <Route*/}
        {/*    path={Path.Main}*/}
        {/*    element={*/}
        {/*      <ProtectedRoutes isAllowed={isLoggedIn}>*/}
        {/*        <Main />*/}
        {/*      </ProtectedRoutes>*/}
        {/*    }*/}
        {/*  />*/}
        {/*  <Route*/}
        {/*    path={Path.Faq}*/}
        {/*    element={*/}
        {/*      <ProtectedRoutes isAllowed={isLoggedIn}>*/}
        {/*        <Faq />*/}
        {/*      </ProtectedRoutes>*/}
        {/*    }*/}
        {/*  />*/}

        {/*<Route*/}
        {/*  path={Path.Login}*/}
        {/*  element={*/}
        {/*    <ProtectedRoutes isAllowed={!isLoggedIn} redirectPath={Path.Main}>*/}
        {/*      <Login />*/}
        {/*    </ProtectedRoutes>*/}
        {/*  }*/}
        {/*/>*/}

        <Route path={Path.NotFound} element={<PageNotFound />} />
      </Routes>
    </div>
  )
}
