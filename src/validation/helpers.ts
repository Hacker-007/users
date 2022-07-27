import { string } from 'zod'
import { validate as uuidValidate } from 'uuid'

export const uuid = () =>
  string().refine((value) => uuidValidate(value), {
    message: 'The property `{PROPERTY_NAME}` must be a valid UUID.',
    params: {
      errorCode: 'invalid_type',
    },
  })
