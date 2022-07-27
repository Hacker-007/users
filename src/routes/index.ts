import express from 'express'
import getHealth from './health'
import { getUserById } from './user'

export default function setupRoutes() {
  const router = express.Router()
  router.get('/health', getHealth)
  router.get('/users/:id', getUserById)

  return router
}
