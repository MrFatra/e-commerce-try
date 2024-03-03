import prisma from "@/lib/instance";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json({ message: 'Success', code: 200, data: products })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 401, data: [] })
    }
}