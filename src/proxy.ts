import { NextRequest, NextResponse } from 'next/server'

// Protect the /admin route with HTTP Basic Auth.
// Set ADMIN_PASSWORD in your environment variables.
// Default is 'admin' — CHANGE THIS before deploying.

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const authHeader = req.headers.get('authorization')

    if (authHeader) {
      const base64 = authHeader.split(' ')[1]
      const decoded = Buffer.from(base64, 'base64').toString('utf-8')
      const [, password] = decoded.split(':')
      const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin'

      if (password === adminPassword) {
        return NextResponse.next()
      }
    }

    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="JDM Direct Admin"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
