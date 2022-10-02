import { IUserService } from '@src/service/userService'
import { APIError, getHttpErrorStatusCode } from '@src/utils/errors'
import { Request, Response } from 'express'

export const getUserByIdFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const user = await userService.getUserById(id)
      res.status(200).json({
        ok: true,
        data: user,
      })
    } catch (e) {
      res.status(getHttpErrorStatusCode(e as APIError)).json({
        ok: false,
        error: (e as APIError).errorType,
      })
    }
  }

export const postUserFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    try {
      const user = await userService.createUser(req.body)
      res.status(201).json({
        ok: true,
        data: user,
      })
    } catch (e) {
      res.status(getHttpErrorStatusCode(e as APIError)).json({
        ok: false,
        error: (e as APIError).errorType,
      })
    }
  }

export const patchUserFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      if (req.body) {
        res.status(204).json({
          ok: true,
        })
      }

      const user = await userService.updateUser(id, req.body)
      res.status(200).json({
        ok: true,
        data: user,
      })
    } catch (e) {
      res.status(getHttpErrorStatusCode(e as APIError)).json({
        ok: false,
        error: (e as APIError).errorType,
      })
    }
  }

export const deleteUserFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const user = await userService.deleteUser(id)
      res.status(200).json({
        ok: true,
        data: user,
      })
    } catch (e) {
      res.status(getHttpErrorStatusCode(e as APIError)).json({
        ok: false,
        error: (e as APIError).errorType,
      })
    }
  }
