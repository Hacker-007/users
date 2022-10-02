import { User, UserSchema } from '@src/models/user'
import { APIError } from '@src/utils/errors'
import { validateAgainstSchema } from '@src/validation'
import { IUserService } from './userService'
import { v4 as uuidv4 } from 'uuid'

export class MockUserService implements IUserService {
  private readonly inMemoryUserStore: Record<string, User>

  constructor() {
    this.inMemoryUserStore = {}
  }

  async getUserById(userId: unknown): Promise<User> {
    const { id } = await validateAgainstSchema(
      { userId },
      UserSchema.pick({ id: true })
    )

    const user = this.inMemoryUserStore[id]
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

    const id = uuidv4()
    this.inMemoryUserStore[id] = {
      id,
      ...userDetails,
    }

    return this.inMemoryUserStore[id]
  }

  async updateUser(id: unknown, details: unknown): Promise<User> {
    const { id: userId } = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    const userDetails = await validateAgainstSchema(
      details,
      UserSchema.omit({ id: true })
    )

    this.inMemoryUserStore[userId] = {
      ...this.inMemoryUserStore[userId],
      ...userDetails,
    }

    return this.inMemoryUserStore[userId]
  }

  async deleteUser(id: unknown): Promise<User> {
    const { id: userId } = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    if (userId in this.inMemoryUserStore) {
      const user = this.inMemoryUserStore[userId]
      delete this.inMemoryUserStore[userId]
      return user
    }

    throw new APIError({
      errorId: 'notFound',
      errorMessage: `The user with the id \`${userId}\` could not be found.`,
    })
  }
}
