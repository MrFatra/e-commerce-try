import { NextRequest, NextResponse } from "next/server";
import joseCheck from "./lib/jose";

export async function middleware(req: NextRequest) {
    try {
        const user = await joseCheck(req)
        const { pathname } = req.nextUrl

        const isAdminApiRoute = pathname.startsWith('/api/admin')
        const isUserApiRoute = pathname.startsWith('/api/user')
        const isDashboardAdminRoute = pathname.startsWith('/dashboard')
        const isUserRoute = pathname.startsWith('/user')
        const isAuthRoute = pathname.startsWith('/auth')

        // default public route
        if (pathname === '/') return NextResponse.next()

        if (user) {
            const adminRole = user.payload.role === 'ADMIN'
            const userRole = user.payload.role === 'USER'
            if (adminRole && !(isAdminApiRoute || isDashboardAdminRoute)) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
            if (userRole && !(isUserRoute || isUserApiRoute)) {
                return NextResponse.redirect(new URL('/user/marketplace', req.url))
            }
            // known user route scope
            if (isAuthRoute && adminRole) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            } else if (isAuthRoute && userRole) {
                // callback url
                return NextResponse.redirect(new URL('/user/marketplace', req.url))
            }
            if (isDashboardAdminRoute && !adminRole) {
                // callback url
                return NextResponse.redirect(new URL('/user/marketplace', req.url))
            }
            if (isAdminApiRoute && !adminRole) {
                // return this or not found
                return NextResponse.json({ message: 'Unauthorized - Bad Request' }, { status: 500 })
            }
            if (isUserApiRoute && adminRole) {
                return NextResponse.redirect(new URL('/dashboard', req.url))
            }
        } else {
            // unknown user route scope
            if (isAdminApiRoute || isUserApiRoute) {
                // return this or not found
                return NextResponse.json({ message: 'Unauthorized - Bad Request' }, { status: 500 })
            }
            if (isDashboardAdminRoute || isUserRoute) {
                // callback url
                return NextResponse.redirect(new URL('/auth/login', req.url))
            }
        }
        return NextResponse.next()
    } catch (error: any) {
        console.error("Error in middleware:", error.message)
        return NextResponse.json({ message: 'Internal Server Error', code: 500 })
    }
}

export const config = {
    matcher: ['/((?!api/auth/logout|_next/static|_next/image|images/client|favicon.ico).*)']
}
