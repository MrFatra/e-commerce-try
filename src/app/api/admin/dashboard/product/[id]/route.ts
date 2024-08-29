import prisma from "@/lib/prisma";
import sessionCheck from "@/lib/session";
import { serverSideDelete, serverSideEdit } from "@/lib/upload";
import { JsonObject } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const product = await prisma.product.findFirst({ where: { id } })

        return NextResponse.json({ message: 'Success', product }, { status: 201 })
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message }, { status: 401 })
    }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const user = await sessionCheck(req);

        if (!user) throw new Error('Unauthorized User')

        const data = await prisma.product.delete({
            where: { id }
        })

        const deleteUpload = await serverSideDelete((data.image as JsonObject).url as string)

        return NextResponse.json({ message: 'Deleted', code: 201, data, deleteUpload })
    } catch (err: any) {
        console.log(err.message)
        return NextResponse.json({ message: err.message, code: 401 });
    }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const user = await sessionCheck(req);

        if (!user) throw new Error('Unauthorized User');

        const formData = await req.formData();

        Object.keys(formData).forEach((key) => formData.get(key) === null && formData.delete(key));

        const data: any = {};

        formData.forEach((value, key) => {
            if (key === 'stock' || key === 'price') data[key] = parseFloat(value as string);
            else data[key] = value;
        });

        let upload: { url: string; size: number; metadata: Record<string, never>; path: { type: string; }; pathOrder: "type"[]; } | undefined;
        const imageFile = formData.get('image');
        const prevImgUrl = formData.get('prevImage') as string | undefined;

        if (!prevImgUrl) throw new Error('No prevImage URL.')

        if (imageFile instanceof File) {
            const imageUrl = URL.createObjectURL(imageFile);
            upload = await serverSideEdit(imageUrl, prevImgUrl, user?.id, user?.role, 'product');
            data.image = upload;
        } else {
            delete data['image']
        }

        delete data['prevImage']

        const edited = await prisma.product.update({
            where: { id },
            data,
        });

        return NextResponse.json({ message: 'Success', code: 201, data: edited });
    } catch (error: any) {
        console.log(error.message)
        return NextResponse.json({ message: error.message, code: 401 });
    }
}