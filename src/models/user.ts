import { uuid } from '@src/validation/helpers'
import { object, string } from 'zod'

export const UserSchema = object({
  id: uuid(),
  email: string(),
  firstName: string(),
  lastName: string(),
  middleInitial: string().optional(),
})

export type User = Zod.infer<typeof UserSchema>
