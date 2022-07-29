import { IUserService } from '@src/service/userService'
import { getHttpErrorStatusCode } from '@src/utils/errors'
import { Request, Response } from 'express'

export const getUserByIdFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    const id = req.params.id
    const userResult = await userService.getUserById(id)

    userResult
      .map((user) => {
        res.status(200).json({
          ok: true,
          data: user,
        })
      })
      .mapErr((error) => {
        res.status(getHttpErrorStatusCode(error)).json({
          ok: false,
          error,
        })
      })
  }

export const postUserFactory =
  (userService: IUserService) => async (req: Request, res: Response) => {
    const id = req.params.id
    const userResult = await userService.getUserById(id)

    userResult
      .map((user) => {
        res.status(200).json({
          ok: true,
          data: user,
        })
      })
      .mapErr((error) => {
        res.status(getHttpErrorStatusCode(error)).json({
          ok: false,
          error,
        })
      })
  }
