import { NextRequest, NextResponse } from 'next/server'
import { setUserCookie } from '../utils/setUserCookie'

export function middleware(req: NextRequest) {
  // Add the user token to the response
  return setUserCookie(req, NextResponse.next())
}