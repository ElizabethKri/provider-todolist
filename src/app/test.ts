import * as z from 'zod'

const UserShema = z.object({
    name: z.string().min(2, {error: 'Минимум 2 символа'}).max(7, 'Максимум 7 символов'),
    age: z.union([z.string(), z.number()]),
    email: z.email(),
    site: z.url(),
    error: z.string().nullable(),
    themeMode: z.literal(['dark', 'light'], 'Невалидный тип'),
    date: z.iso.datetime({local: true}),
})

type User = z.infer<typeof UserShema>

const man: User = {
    name: 'billie',
    age: 26,
    email: 'xxx@mail.com',
    site: 'https://foo.com',
    error: null,
    themeMode: 'dark',
    date: '2025-10-25T16:07:43.947'
}

console.log(UserShema.parse(man))