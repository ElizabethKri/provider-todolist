import { selectThemeMode } from "@/app/app-slice"
import { useAppDispatch, useAppSelector } from "@/common/hooks"
import { getTheme } from "@/common/theme"
import Button from "@mui/material/Button"
import Checkbox from "@mui/material/Checkbox"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormGroup from "@mui/material/FormGroup"
import FormLabel from "@mui/material/FormLabel"
import Grid from "@mui/material/Grid2"
import TextField from "@mui/material/TextField"
import { Controller, useForm } from "react-hook-form"
import s from "./Login.module.css"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/features/auth/model/auth-schema.ts"
import { loginTC, selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { useNavigate } from "react-router"
import { Path } from "@/common/components/routing/Routing.tsx"

type LoginInputs = z.infer<typeof loginSchema>

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<LoginInputs>({
    defaultValues: {
      email: "post.kri@gmail.com",
      password: "29238L.k",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema),
  })

  console.log({ errors })

  const themeMode = useAppSelector(selectThemeMode)
  console.log("render Login ❤ ️")

  // const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const onSubmit = (data: LoginInputs) => {
    dispatch(loginTC(data)).then((res: any) => {
      if (res.payload.isLoggedIn) {
        navigate(Path.Main)
      }
    })
    reset()
    console.log(data)
  }

  // 1 variant

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate(Path.Main)
  //   }
  // }, [isLoggedIn])

  // 2 variant
  // if (isLoggedIn) {
  //   return <Navigate to={Path.Main} />
  // }

  return (
    <Grid container justifyContent={"center"}>
      <FormControl>
        <FormLabel>
          <p>
            To login get registered
            <a
              style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
              href="https://social-network.samuraijs.com"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>
            <b>Email:</b> free@samuraijs.com
          </p>
          <p>
            <b>Password:</b> free
          </p>
        </FormLabel>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <TextField
              error={!!errors.email}
              label="Email"
              margin="normal"
              {...register(
                "email",
                // {
                //     required: {value: true, message: 'Incorrect email address'},
                //     pattern: {
                //         value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //         message: 'Incorrect email address',
                //     }}
              )}
            />

            {errors.email && <span className={s.errrorMessage}>{errors.email.message}</span>}
            {/*<FormControlLabel*/}
            {/*  value={!!errors.password}*/}
            {/*  label={"password"}*/}
            {/*  control={*/}
            <Controller
              name="password"
              control={control}
              rules={{
                required: !!errors.password,
              }}
              render={({ field: { value, ...rest } }) => (
                <TextField value={value} {...rest} type={"password"} label={"Password"} />
              )}
            />
            {/*}*/}
            {/*/>*/}
            {errors.password && <span className={s.errrorMessage}>{errors.password.message}</span>}
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <Checkbox
                      // onChange={(e) => field.onChange(e.target.checked)}
                      checked={value}
                      {...rest}
                    />
                  )}
                />
              }
            />

            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </form>
      </FormControl>
    </Grid>
  )
}
