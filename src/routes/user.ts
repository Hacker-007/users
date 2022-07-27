import UserService from '@src/service/userService'
import { getHttpErrorStatusCode } from '@src/utils/errors'
import { Request, Response } from 'express'

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id
  const userResult = await UserService.instance.getUserById(id)

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
