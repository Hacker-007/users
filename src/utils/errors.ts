type APIErrorType =
  | {
      errorId: 'validation'
      issues: APIValidationIssue[]
    }
  | {
      errorId: 'database'
      errorMessage: string
    }
  | {
      errorId: 'notFound'
      errorMessage: string
    }

interface APIValidationIssue {
  validationErrorType: string
  issueMessage: string
}

class APIError extends Error {
  readonly errorType: APIErrorType

  constructor(errorType: APIErrorType) {
    super()
    this.errorType = errorType
  }
}

function getHttpErrorStatusCode(error: APIError): number {
  if (error.errorType.errorId === 'validation') {
    return 400
  }

  return 500
}

export { APIError, APIValidationIssue, getHttpErrorStatusCode }
