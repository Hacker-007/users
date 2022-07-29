type APIError =
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

function getHttpErrorStatusCode(error: APIError): number {
  if (error.errorId === 'validation') {
    return 400
  }

  return 500
}

export { APIError, APIValidationIssue, getHttpErrorStatusCode }
