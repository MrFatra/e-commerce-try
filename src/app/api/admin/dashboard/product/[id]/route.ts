import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const product = await prisma.product.findFirst({ where: { id } })
        console.log(product)
        
        return NextResponse.json({ message: 'Success', product }, { status: 201 })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 401 })
    }
}