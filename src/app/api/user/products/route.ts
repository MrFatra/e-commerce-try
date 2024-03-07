import sessionCheck from "@/lib/session";
import prisma from "@/lib/instance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json({ message: 'Success!', code: 200, products })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 500, products: [] })
    }
}