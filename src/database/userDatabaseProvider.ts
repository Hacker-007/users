import { PrismaClient } from '@prisma/client'
import { User, UserWithoutId } from '@src/models/user'
import { None, Option, Some } from '@src/utils/option'

export interface IUserDatabaseProvider {
  getUserById(id: string): Promise<User>
  createUser(userDetails: UserWithoutId): Promise<User>
}

export class UserDatabaseProvider {
  private readonly prismaClient: PrismaClient

  constructor() {
    this.prismaClient = new PrismaClient()
  }

  async getUserById(id: string): Promise<Option<User>> {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    })

    if (user === null) {
      return new None()
    }

    return new Some({
      ...user,
      middleInitial: user.middleInitial ?? undefined,
    })
  }

  async createUser(userDetails: UserWithoutId): Promise<Option<User>> {
    const user = await this.prismaClient.user.create({
      data: userDetails,
    })

    return new Some({
      ...user,
      middleInitial: user.middleInitial ?? undefined,
    })
  }

  async updateUserDetails(
    id: string,
    userDetails: Partial<UserWithoutId>
  ): Promise<Option<User>> {
    const user = await this.prismaClient.user.update({
      data: userDetails,
      where: {
        id,
      },
    })

    return new Some({
      ...user,
      middleInitial: user.middleInitial ?? undefined,
    })
  }

  async deleteUser(id: string): Promise<Option<User>> {
    const user = await this.prismaClient.user.delete({
      where: {
        id,
      },
    })

    return new Some({
      ...user,
      middleInitial: user.middleInitial ?? undefined,
    })
  }
}
