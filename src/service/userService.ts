import { IUserDatabaseProvider } from '@src/database/userDatabaseProvider'
import { User, UserSchema, UserWithoutId } from '@src/models/user'
import { APIError } from '@src/utils/errors'
import { validateAgainstSchema } from '@src/validation'
import { okAsync, errAsync, fromPromise, ResultAsync } from 'neverthrow'
import { v4 as uuidv4 } from 'uuid'

export interface IUserService {
  getUserById(id: unknown): ResultAsync<User, APIError>
  createUser(userDetails: UserWithoutId): ResultAsync<User, APIError>
}

export class UserService implements IUserService {
  constructor(private readonly userProvider: IUserDatabaseProvider) {}

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

  createUser(userDetails: UserWithoutId): ResultAsync<User, APIError> {
    const validationResult = validateAgainstSchema(
      userDetails,
      UserSchema.omit({ id: true })
    )

    return validationResult.andThen<User, APIError>((userDetails) => {
      fromPromise<User, APIError>(
        this.userProvider.createUser(userDetails),
        (error) => ({
          errorId: 'database',
          errorMessage: (error as Error).message,
        })
      )
    })
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

  createUser(userDetails: UserWithoutId): ResultAsync<User, APIError> {
    const validationResult = validateAgainstSchema(
      userDetails,
      UserSchema.omit({ id: true })
    )

    return validationResult.andThen<User, APIError>((userDetails) => {
      const id = uuidv4()
      this.inMemoryUserStore[id] = {
        id,
        ...userDetails,
      }

      return okAsync(this.inMemoryUserStore[id])
    })
  }
}
