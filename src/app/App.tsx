import { selectThemeMode } from "@/app/app-slice"
import { ErrorSnackbar, Header } from "@/common/components"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import { ThemeProvider } from "@mui/material/styles"
import { Routing } from "@/common/components/routing/Routing.tsx"
import { useEffect, useState } from "react"
import { meTC } from "@/features/auth/model/auth-slice.ts"
import { CircularProgress } from "@mui/material"
import s from "./App.css"

export const App = () => {
  const themeMode = useAppSelector(selectThemeMode)

  const [init, setIsInint] = useState(false)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC()).finally(() => {
      setIsInint(true)
    })
  }, [])

  if (!init) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={s.app}>
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
