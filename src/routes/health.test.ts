import { createServer } from '../utils/server'
import request from 'supertest'
import { MockUserService } from '@src/service/userService'

describe('Health Endpoint (/health)', () => {
  it('GET /health should return OK', async () => {
    const app = createServer(new MockUserService())
    const response = await request(app)
      .get('/api/v1/health')
      .expect('Content-Type', /json/)

    expect(response.statusCode).toEqual(200)
    expect(response.body.ok).toBeDefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data.status).toBeDefined()
    expect(response.body.data.uptime).toBeDefined()
    expect(response.body.ok).toBe(true)
    expect(response.body.data.status).toEqual('OK')
  })
})
