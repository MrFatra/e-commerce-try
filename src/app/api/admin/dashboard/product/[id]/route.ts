import prisma from "@/lib/prisma";
import sessionCheck from "@/lib/session";
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

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        await sessionCheck(req)

        const formData = await req.formData()

        Object.keys(formData).forEach((key) => formData.get(key) === null && formData.delete(key))

        const data: any = {}

        formData.forEach((value, key) => {
            if (key === 'stock' || key === 'price') data[key] = parseFloat(value as string)
            else data[key] = value
        })

        console.log('data: ', data)

        const edited = await prisma.product.update({
            where: { id },
            data,
        })

        return NextResponse.json({ message: 'Success', code: 201, data: edited })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, code: 401 })
    }
}