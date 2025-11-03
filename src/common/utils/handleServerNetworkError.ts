import {setAppErrorAC, setAppStatusAC} from "@/app/app-slice"
import type {Dispatch} from "@reduxjs/toolkit"
import {isAxiosError} from "axios"
import * as z from 'zod'

export const handleServerNetworkError = (error: unknown, dispatch: Dispatch): void => {
    let errorMessage

    switch (true) {
        case isAxiosError (error):
            errorMessage = error.response?.data?.message || error.message
            break

        case error instanceof z.ZodError:
            console.table(error.issues)
            console.log('zod')
            errorMessage = 'Zod error. Смотри консоль'
            break

        case error instanceof Error:
            console.log('native')
            errorMessage = `Нативная ошибка ` + error.message
            break



        default:
            errorMessage = JSON.stringify (error)
    }


    dispatch (setAppErrorAC ({error: errorMessage}))
    dispatch (setAppStatusAC ({status: "failed"}))
}
