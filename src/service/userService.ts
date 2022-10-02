import { IUserDatabaseProvider } from '@src/database/userDatabaseProvider'
import { User, UserSchema } from '@src/models/user'
import { APIError } from '@src/utils/errors'
import { validateAgainstSchema } from '@src/validation'

export interface IUserService {
  getUserById(id: unknown): Promise<User>
  createUser(details: unknown): Promise<User>
  updateUser(id: unknown, details: unknown): Promise<User>
  deleteUser(id: unknown): Promise<User>
}

export class UserService implements IUserService {
  constructor(private readonly userProvider: IUserDatabaseProvider) {}

  async getUserById(id: unknown): Promise<User> {
    const { id: userId } = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    const user = await this.userProvider.getUserById(userId)
    if (user === undefined) {
      throw new APIError({
        errorId: 'notFound',
        errorMessage: `The user with the id \`${userId}\` could not be found.`,
      })
    }

    return user
  }

  async createUser(details: unknown): Promise<User> {
    const userDetails = await validateAgainstSchema(
      details,
      UserSchema.omit({ id: true })
    )

    return await this.userProvider.createUser(userDetails)
  }

  async updateUser(id: unknown, details: unknown): Promise<User> {
    const { id: userId } = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    const userDetails = await validateAgainstSchema(
      details,
      UserSchema.omit({ id: true }).partial()
    )

    return await this.userProvider.updateUserDetails(userId, userDetails)
  }

  async deleteUser(id: unknown): Promise<User> {
    const { id: userId } = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    return await this.userProvider.deleteUser(userId)
  }
}
