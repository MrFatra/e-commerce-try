import sessionCheck from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/imgur";

export async function GET(req: NextRequest) {
    try {
        const products = await prisma.product.findMany()
        return NextResponse.json({ message: 'Success!', code: 200, products })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 500, products: [] })
    }
}

export async function POST(req: NextRequest) {
    try {
        await sessionCheck(req)

        const formData = await req.formData()

        const image = formData.get('image') as File
        const name = formData.get('name')!.toString()
        const price = parseFloat(formData.get('price')!.toString())
        const stock = parseFloat(formData.get('stock')!.toString())

        const result = await uploadImage(image, name)
        const product = await prisma.product.create({
            data: { name, price, stock, image: result }
        })
        return NextResponse.json({ message: 'Product added!', code: 200, product })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Add product failed!', code: 500 })
    }
}