import { User } from '@src/models/user'
import { Pool } from 'pg'

export default class UserDatabaseProvider {
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
}
