import { APIError } from '@src/utils/errors'
import { getValidationErrorResponse } from '@src/utils/validators'
import { ok, Result } from 'neverthrow'
import { ZodSchema } from 'zod'
import { uuid } from './helpers'

export async function validateAgainstSchema<T>(
  data: unknown,
  schema: ZodSchema<T>
): Promise<Result<T, APIError>> {
  const parseResult = await schema.safeParseAsync(data)
  if (parseResult.success) {
    return ok(parseResult.data)
  }

  return getValidationErrorResponse(parseResult.error)
}

export { uuid }
