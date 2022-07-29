import { APIError } from '@src/utils/errors'
import { getValidationErrorResponse } from '@src/utils/validators'
import { ResultAsync } from 'neverthrow'
import { ZodError, ZodSchema } from 'zod'
import { uuid } from './helpers'

export function validateAgainstSchema<T>(
  data: unknown,
  schema: ZodSchema<T>
): ResultAsync<T, APIError> {
  const parseResult = ResultAsync.fromPromise(
    schema.parseAsync(data),
    (error) => error as ZodError
  )

  return parseResult.mapErr((error) => getValidationErrorResponse(error))
}

export { uuid }
