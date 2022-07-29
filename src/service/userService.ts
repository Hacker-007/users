import UserDatabaseProvider from '@src/database/userDatabaseProvider'
import { User, UserSchema } from '@src/models/user'
import { APIError } from '@src/utils/errors'
import { validateAgainstSchema } from '@src/validation'
import { okAsync, errAsync, fromPromise, ResultAsync } from 'neverthrow'

export interface IUserService {
  getUserById(id: unknown): ResultAsync<User, APIError>
}

export class UserService implements IUserService {
  constructor(private readonly userProvider: UserDatabaseProvider) {}

  getUserById(id: unknown): ResultAsync<User, APIError> {
    const validationResult = validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    return validationResult.andThen(({ id }) =>
      fromPromise<User, APIError>(
        this.userProvider.getUserById(id),
        (error) => ({
          errorId: 'database',
          errorMessage: (error as Error).message,
        })
      )
    )
  }
}

export class MockUserService implements IUserService {
  private readonly inMemoryUserStore: Record<string, User>

  constructor() {
    this.inMemoryUserStore = {}
  }

  getUserById(id: unknown): ResultAsync<User, APIError> {
    const validationResult = validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    return validationResult.andThen<User, APIError>(({ id }) => {
      const user = this.inMemoryUserStore[id]
      if (user === undefined) {
        return errAsync({
          errorId: 'notFound',
          errorMessage: `The user with the id \`${id}\` could not be found.`,
        })
      } else {
        return okAsync(user)
      }
    })
  }
}
