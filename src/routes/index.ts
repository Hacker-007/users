import { IUserService } from '@src/service/userService'
import express from 'express'
import getHealth from './health'
import { getUserByIdFactory, postUserFactory } from './user'

export default function setupRoutes(userService: IUserService) {
  const router = express.Router()
  router.get('/health', getHealth)
  router.get('/users/:id', getUserByIdFactory(userService))
  router.post('/users', postUserFactory(userService))

  return router
}
