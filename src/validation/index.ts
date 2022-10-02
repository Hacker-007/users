import { getValidationErrorResponse } from '@src/utils/validators'
import { ZodError, ZodSchema } from 'zod'
import { uuid } from './helpers'

export async function validateAgainstSchema<T>(
  data: unknown,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    return await schema.parseAsync(data)
  } catch (e) {
    throw getValidationErrorResponse(e as ZodError)
  }
}

export { uuid }
