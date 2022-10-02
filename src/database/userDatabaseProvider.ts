import { PrismaClient } from '@prisma/client'
import { User, UserWithoutId } from '@src/models/user'
import { APIError } from '@src/utils/errors'

export interface IUserDatabaseProvider {
  getUserById(id: string): Promise<User | undefined>
  createUser(userDetails: UserWithoutId): Promise<User>
  updateUserDetails(
    id: string,
    userDetails: Partial<UserWithoutId>
  ): Promise<User>
  deleteUser(id: string): Promise<User>
}

export class UserDatabaseProvider implements IUserDatabaseProvider {
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async getUserById(id: string): Promise<User | undefined> {
    try {
      const user = await this.prismaClient.user.findUnique({
        where: {
          id,
        },
      })

      if (user === null) {
        return undefined
      }

      return {
        ...user,
        middleInitial: user.middleInitial ?? undefined,
      }
    } catch (e) {
      throw new APIError({
        errorId: 'database',
        errorMessage: (e as Error).message,
      })
    }
  }

  async createUser(userDetails: UserWithoutId): Promise<User> {
    try {
      const user = await this.prismaClient.user.create({
        data: userDetails,
      })

      return {
        ...user,
        middleInitial: user.middleInitial ?? undefined,
      }
    } catch (e) {
      throw new APIError({
        errorId: 'database',
        errorMessage: (e as Error).message,
      })
    }
  }

  async updateUserDetails(
    id: string,
    userDetails: Partial<UserWithoutId>
  ): Promise<User> {
    try {
      const user = await this.prismaClient.user.update({
        data: userDetails,
        where: {
          id,
        },
      })

      return {
        ...user,
        middleInitial: user.middleInitial ?? undefined,
      }
    } catch (e) {
      console.log(e)
      throw new APIError({
        errorId: 'database',
        errorMessage: (e as Error).message,
      })
    }
  }

  async deleteUser(id: string): Promise<User> {
    try {
      const user = await this.prismaClient.user.delete({
        where: {
          id,
        },
      })

      return {
        ...user,
        middleInitial: user.middleInitial ?? undefined,
      }
    } catch (e) {
      console.log(e)
      throw new APIError({
        errorId: 'database',
        errorMessage: (e as Error).message,
      })
    }
  }
}
