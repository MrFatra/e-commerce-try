'use server';

import { unstable_noStore } from 'next/cache';
import { backendClient } from '@/app/api/edgestore/[...edgestore]/route';

export async function serverSideUpload(url: string, userId: string, userRole: 'ADMIN' | 'USER', uploadType: 'product' | 'profile') {
    unstable_noStore(); // to make sure the upload request is sent every time
    const extension = url.split('.').pop();
    if (!extension) {
        throw new Error('Could not get extension from url');
    }

    const res = await backendClient.publicFiles.upload({
        content: {
            url,
            extension,
        },
        options: {
            temporary: false,
        },
        ctx: {
            userId,
            userRole,
        },
        input: {
            type: uploadType,
        },
    });
    console.log(res);
    return res
}

export async function serverSideEdit(url: string, prevImgUrl: string, userId: string, userRole: 'ADMIN' | 'USER', uploadType: 'product' | 'profile') {
    unstable_noStore(); // to make sure the upload request is sent every time
    const extension = url.split('.').pop();
    if (!extension) {
        throw new Error('Could not get extension from url');
    }

    const res = await backendClient.publicFiles.upload({
        content: {
            url,
            extension,
        },
        options: {
            temporary: false,
            replaceTargetUrl: prevImgUrl,
        },
        ctx: {
            userId,
            userRole,
        },
        input: {
            type: uploadType,
        },
    });
    console.log(res);
    return res
}

export async function serverSideDelete(url: string) {
    const res = await backendClient.publicFiles.deleteFile({ url });
    console.log(res)
    return res
}