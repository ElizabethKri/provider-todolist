import * as z from 'zod'

const UserShema = z.object({
    name: z.string().min(2, {error: 'Минимум 2 символа'}).max(7, 'Максимум 7 символов'),
    age: z.union([z.string(), z.number()]),
    email: z.email(),
    site: z.url(),
    error: z.string().nullable(),
    themeMode: z.literal(['dark', 'light'], 'Невалидный тип')
})

type User = z.infer<typeof UserShema>

const man: User = {
    name: 'billie',
    age: 26,
    email: 'xxx@mail.com',
    site: 'https://foo.com',
    error: null,
    themeMode: 'dark'
}

console.log(UserShema.parse(man))