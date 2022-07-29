import { IUserService } from '@src/service/userService'
import express from 'express'
import getHealth from './health'
import { getUserByIdFactory } from './user'

export default function setupRoutes(userService: IUserService) {
  const router = express.Router()
  router.get('/health', getHealth)
  router.get('/users/:id', getUserByIdFactory(userService))

  return router
}
