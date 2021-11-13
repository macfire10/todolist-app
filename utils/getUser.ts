import type { NextApiRequest } from 'next'
import prisma from '../lib/prisma'
import { USER_TOKEN } from './constants'

export async function getUser(req: NextApiRequest) {
  const userToken = req.cookies[USER_TOKEN]

  let result = await prisma.user.findUnique({
    where: {
      id: userToken,
    }
  })

  if (!result) {
    result = await prisma.user.create({
      data: {
        id: userToken,
      }
    })
  }

  return result
}