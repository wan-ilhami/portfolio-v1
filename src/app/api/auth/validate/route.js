import { jwtDecode } from 'jwt-decode'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { credential } = await request.json()

    if (!credential) {
      return NextResponse.json(
        { error: 'No credential provided' },
        { status: 400 }
      )
    }

    // Decode the token
    const decoded = jwtDecode(credential)

    // Verify token with Google
    const verifyResponse = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    )

    if (!verifyResponse.ok) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google'
      }
    })
  } catch (error) {
    console.error('Auth validation error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 400 }
    )
  }
}