import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'
import prisma from "@/lib/instance";

export default async function sessionCheck(req: NextRequest) {
    const session = req.cookies.get('session')
    if (!session) throw new Error('Unauthorized - No session provided.')

    const token = process.env.JWT_SECRET
    if (!token) throw new Error('Unauthorized - No secret key provided.')

    const decoded: JwtPayload | any = jwt.verify(session.value, token)
    const user = await prisma.user.findFirst({ where: { id: decoded.userId } })

    if (!user) throw new Error('User not found.')
}