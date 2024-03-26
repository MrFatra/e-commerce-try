import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { serialize } from 'cookie'
import { NextRequest, NextResponse } from "next/server";
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json()

        const user = await prisma.user.findFirst({ where: { username } })
        if (!user) throw new Error('Invalid username or password.')

        const decryptedPass = await bcrypt.compare(password, user.password)
        if (!decryptedPass) throw new Error('Invalid username or password.')

        const { password: _, ...userWithoutPassword } = user

        const cookie = signJWT(user.id, user.role)

        const responseHeaders = new Headers()
        responseHeaders.append('Set-Cookie', cookie)

        return NextResponse.json({ message: `Authenticated as ${user.fullName}`, code: 200, user: userWithoutPassword }, { headers: responseHeaders })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 500 })
    }
}

const signJWT = (userId: string, role: string) => {
    const secret = process.env.JWT_SECRET
    if (!secret) throw new Error('Invalid secret token.')
    const token = jwt.sign({ userId, role }, secret, {
        expiresIn: '2d',
    })
    const cookie = serialize('session', token, {
        maxAge: 2 * 24 * 60 * 60,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    })
    return cookie
}
