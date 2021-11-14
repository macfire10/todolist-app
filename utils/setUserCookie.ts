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
  let cookie = request.cookies[USER_TOKEN]

  if (!cookie) {
    cookie = nanoid()
  }
  
  response.cookie(USER_TOKEN, cookie, { path: '/', httpOnly: true })

  return response
}
