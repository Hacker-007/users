import { Request, Response } from 'express'

const getHealth = (_req: Request, res: Response) => {
  res
    .status(200)
    .send({
      ok: true,
      data: {
        status: 'OK',
        uptime: process.uptime(),
      },
    })
    .end()
}

export default getHealth
