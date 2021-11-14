import cookie from 'cookie'
import prisma from '../lib/prisma'
import { USER_TOKEN } from './constants'

/*
  We pull a user session from response since
  the initial request will not have cookies, but server
  will always be able generate new/retrieve currrent session
*/
export async function getUser(res) {
  try {
    const parsedCookies = cookie.parse(res.getHeader('Set-Cookie')[0])
    const userToken = parsedCookies[USER_TOKEN]

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
  } catch (error) {
    throw new Error(error)
  }
}