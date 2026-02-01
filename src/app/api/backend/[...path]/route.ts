/**
 * Proxy to backend API. Use when NEXT_PUBLIC_USE_API_PROXY=true so the browser
 * only sees same-origin requests and we can normalize 401/404 to 200 (same body)
 * to avoid "Failed to load resource" in the console for expected auth states.
 */
import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || 'http://localhost:3001'

/** Paths where we normalize 401/404 to 200 so the client can handle without console errors */
const NORMALIZE_STATUS_PATHS = [
  '/api/auth/me',
  '/api/users/onboarding-status',
]

function shouldNormalizeStatus(pathname: string): boolean {
  return NORMALIZE_STATUS_PATHS.some((p) => pathname === p || pathname.startsWith(p + '?'))
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context.params, 'GET')
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context.params, 'POST')
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context.params, 'PUT')
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context.params, 'PATCH')
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  return proxyRequest(request, context.params, 'DELETE')
}

async function proxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
  method: string
) {
  const { path } = await params
  const pathname = '/' + path.join('/')
  const search = request.nextUrl.searchParams.toString()
  const url = `${BACKEND_URL}${pathname}${search ? `?${search}` : ''}`

  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('connection')

  let body: string | undefined
  if (method !== 'GET' && method !== 'HEAD') {
    try {
      body = await request.text()
    } catch {
      // no body
    }
  }

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: body || undefined,
    })

    const contentType = res.headers.get('content-type') || 'application/json'
    const isJson = contentType.includes('application/json')
    const data = isJson ? await res.json().catch(() => ({})) : await res.text()

    const normalize = shouldNormalizeStatus(pathname) && (res.status === 401 || res.status === 404)

    if (normalize && isJson && typeof data === 'object') {
      // Log real status on server so devs can still debug (e.g. grep for "401" or "404")
      const msg = (data as { message?: string })?.message
      console.warn(
        `[proxy] ${pathname} -> ${res.status} (normalized to 200)${msg ? ` message=${msg}` : ''}`
      )
      return NextResponse.json(
        { ...data, _statusCode: res.status },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }

    if (isJson) {
      return NextResponse.json(data, { status: res.status })
    }
    return new NextResponse(data, { status: res.status, headers: { 'Content-Type': contentType } })
  } catch (err) {
    console.error('Backend proxy error:', err)
    return NextResponse.json(
      { success: false, message: 'Backend unavailable', errors: ['Proxy error'] },
      { status: 502 }
    )
  }
}
