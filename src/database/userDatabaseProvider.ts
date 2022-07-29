import { User, UserWithoutId } from '@src/models/user'
import { Pool } from 'pg'

export interface IUserDatabaseProvider {
  getUserById(id: string): Promise<User>
  createUser(userDetails: UserWithoutId): Promise<User>
}

export class UserDatabaseProvider {
  private readonly pool: Pool

  constructor() {
    this.pool = new Pool()
  }

  async getUserById(id: string): Promise<User> {
    const { rows } = await this.pool.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id]
    )

    return rows[0]
  }

  async createUser(userDetails: UserWithoutId): Promise<User> {
    const { rows } = await this.pool.query<User>(
      'INSERT INTO users(email, first_name, last_name, middle_initial) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        userDetails.email,
        userDetails.firstName,
        userDetails.lastName,
        userDetails.middleInitial,
      ]
    )

    return rows[0]
  }
}
