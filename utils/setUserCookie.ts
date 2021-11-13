import { nanoid } from 'nanoid'
import { NextRequest, NextResponse } from 'next/server'
import { USER_TOKEN } from './constants'

/**
 * Adds the user token cookie to a response.
 */
 export async function setUserCookie(
  request: NextRequest,
  response: NextResponse
) {
  const cookie = request.cookies[USER_TOKEN]

  if (!cookie) {
    response.cookie(USER_TOKEN, nanoid(), { httpOnly: true })
  }

  return response
}
