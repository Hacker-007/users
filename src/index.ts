import 'express-async-errors'
import 'dotenv/config'

import { createServer, runServer } from './utils/server'
import { MockUserService } from './service/userService'

const port = parseInt(process.env.PORT ?? '3000')
const server = createServer(new MockUserService())
runServer(server, { port })
