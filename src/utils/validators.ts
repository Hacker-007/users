import { setErrorMap, ZodError, ZodErrorMap, ZodIssue, ZodIssueCode } from 'zod'
import { APIError, APIValidationIssue } from './errors'

const validationErrorMap: ZodErrorMap = (issue, ctx) => {
  if (issue.code === ZodIssueCode.invalid_type) {
    if (issue.received === 'undefined') {
      return { message: 'The property `{PROPERTY_NAME}` must be provided.' }
    } else {
      return {
        message: `The property \`{PROPERTY_NAME}\` was expected to be of type \`${issue.expected}\` but was found to be of type \`${issue.received}\`.`,
      }
    }
  }

  return { message: ctx.defaultError }
}

setErrorMap(validationErrorMap)

const getValidationErrorType = (issue: ZodIssue) => {
  if (issue.code === 'custom') {
    return issue.params?.errorCode || 'unknown_error'
  } else if (issue.code === 'invalid_type' && issue.received === 'undefined') {
    return 'required_property'
  }

  return issue.code
}

export function getValidationErrorResponse<T>(
  validationError: ZodError<T>
): APIError {
  const issues: APIValidationIssue[] = validationError.issues.map(
    (issue: ZodIssue) => {
      const propertyName = issue.path.join('.')
      return {
        validationErrorType: getValidationErrorType(issue),
        issueMessage: issue.message.replaceAll('{PROPERTY_NAME}', propertyName),
      }
    }
  )

  return new APIError({
    errorId: 'validation',
    issues,
  })
}
