import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import { Server } from 'http'
import routeLogger from './routeLogger'
import setupRoutes from '@src/routes'

export function createServer() {
  const app = express()
  app.use(express.json())
  app.use(helmet())
  app.use(handleErrors)
  app.use(routeLogger)

  app.use('/api/v1', setupRoutes())

  return app
}

interface ServerOptions {
  port: number
}

export function runServer(app: Express, options: ServerOptions) {
  const server = app.listen(options.port, () => {
    console.log(`🚀 Started HTTP server on port ${options.port}.`)
  })

  process.on('SIGINT', () => handleGracefulShutdown('SIGINT', server))
  process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM', server))
  process.on('SIGUSR1', () => handleGracefulShutdown('SIGTERM', server))
  process.on('SIGUSR2', () => handleGracefulShutdown('SIGTERM', server))
}

function handleErrors(
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    next(error)
  } else {
    console.log('An error occurred while handling a request.')
    console.error(error)
    res.status(500).json({
      ok: false,
      message: error.message,
    })
  }
}

function handleGracefulShutdown(signal: string, server: Server) {
  console.log(`${signal} signal received. Terminating the HTTP server.`)
  server.close((error) => {
    if (error) {
      console.log(
        'Encountered an error when attempting to terminate the server.'
      )
      console.error(error)
    }

    console.log('Terminated the server.')
    process.exit(0)
  })
}
