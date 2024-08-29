import sessionCheck from "@/lib/session";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/imgur";
import { serverSideUpload } from "@/lib/upload";

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
        const user = await sessionCheck(req)

        if (!user) throw new Error('Unauthorized User')

        const formData = await req.formData();

        Object.keys(formData).forEach((key) => formData.get(key) === null && formData.delete(key));

        const data: any = {}

        formData.forEach((value, key) => {
            if (key === 'stock' || key === 'price') data[key] = parseFloat(value as string);
            else data[key] = value;
        })

        let upload
        const imageFile = formData.get('image')
        if (imageFile instanceof File) {
            upload = await serverSideUpload(URL.createObjectURL(imageFile), user?.id, user?.role, 'product')
            data.image = upload
        }

        const product = await prisma.product.create({ data })
        
        return NextResponse.json({ message: 'Product added!', code: 200, product })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: 'Add product failed!', code: 500 })
    }
}