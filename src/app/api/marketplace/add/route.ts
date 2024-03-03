import prisma from "@/lib/instance";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest) {
    try {
        const { name, quantity, price } = req.body
        const product = await prisma.product.create({
            data: { name, price, quantity }
        })
        return NextResponse.json({ message: 'Product added!', code: 200, product })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Add product failed!', code: 401 })
    }


}