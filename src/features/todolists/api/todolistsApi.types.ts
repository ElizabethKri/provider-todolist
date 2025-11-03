import * as z from "zod";
import {baseResponseSchema} from "@/common/types";

// export type Todolist = {
//   id: string
//   title: string
//   addedDate: string
//   order: number
// }

export const domainTodolistSchema = z.object ({
  id: z.string(),
  title: z.string(),
  addedDate: z.iso.datetime({local: true}),
  order: z.number().int(),
})

export type Todolist = z.infer<typeof domainTodolistSchema>

export const createTodolistResponseSchema = baseResponseSchema(
    z.object({
      item: domainTodolistSchema
    })
)

export type CreateTodolistResponse = z.infer<typeof createTodolistResponseSchema>