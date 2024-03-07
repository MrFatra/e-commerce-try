import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
    try {
        const headers = new Headers()
        const cookie = serialize('session', '', {
            maxAge: 0,
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'
        })
        headers.append('Set-Cookie', cookie)
        return NextResponse.json({ message: 'Logout success!', code: 200 }, { headers })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Logout failed!', code: 500 })
    }

}