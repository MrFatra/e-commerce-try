import { NextRequest } from "next/server";
import * as jose from 'jose'

export default async function joseCheck(req: NextRequest) {
    const session = req.cookies.get('session')
    if (!session) return null

    const token = process.env.JWT_SECRET
    if (!token) throw new Error('Unauthorized - No secret key provided.')

    const decoded = await jose.jwtVerify(session.value, new TextEncoder().encode(token))

    return decoded
}