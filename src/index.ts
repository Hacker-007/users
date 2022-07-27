import 'express-async-errors'
import 'dotenv/config'

import { createServer, runServer } from './utils/server'

const port = parseInt(process.env.PORT ?? '3000')
const server = createServer()
runServer(server, { port })
