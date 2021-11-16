import cookie from 'cookie'
import { nanoid } from 'nanoid'
import prisma from '../lib/prisma'
import { USER_TOKEN } from './constants'

/*
  We pull a user session from response since
  the initial request will not have cookies, but server
  will always be able generate new/retrieve currrent session
*/
export async function getUser(req, res) {
  try {
    let token = req.cookies[USER_TOKEN]

    if (!token) {
      token = nanoid()

      await prisma.user.create({
        data: {
          id: token,
        }
      })
    }

    res.setHeader('Set-Cookie', cookie.serialize(USER_TOKEN, token, { path: '/', httpOnly: true }))

    return token
  } catch (error) {
    throw new Error(error)
  }
}