import { User, UserSchema } from '@src/models/user'
import { APIError } from '@src/utils/errors'
import { validateAgainstSchema } from '@src/validation'
import { Result } from 'neverthrow'

export default class UserService {
  private static _instance: UserService

  static get instance() {
    if (this._instance === undefined || this._instance === null) {
      this._instance = new this()
    }

    return this._instance
  }

  async getUserById(id: unknown): Promise<Result<User, APIError>> {
    const validationResult = await validateAgainstSchema(
      { id },
      UserSchema.pick({ id: true })
    )

    return validationResult.map(({ id }) => ({
      id,
      email: 'revanthpothukuchi123@gmail.com',
      firstName: 'Revanth',
      lastName: 'Pothukuchi',
      middleInitial: 'V',
    }))
  }
}
