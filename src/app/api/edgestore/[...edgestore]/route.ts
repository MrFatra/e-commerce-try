import { initEdgeStore } from '@edgestore/server';
import { initEdgeStoreClient } from '@edgestore/server/core';
import { CreateContextOptions, createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import sessionCheck from '@/lib/session';
import { z } from 'zod';

type Context = {
    userId: string
    userRole: 'USER' | 'ADMIN'
}

async function createContext({ req }: CreateContextOptions): Promise<Context> {
    const user = await sessionCheck(req)

    console.log('user: ', user)

    if (!user) throw new Error('Unauthorized Upload - Fail')

    return {
        userId: user.id,
        userRole: user.role,
    }
}

const es = initEdgeStore.context<Context>().create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicFiles: es.fileBucket({
        maxSize: 1 * 1024 * 1024, // 1MB
    }).input(z.object({
        type: z.enum(['product', 'profile'])
    })).path(({ input }) => [{ type: input.type }]),
});

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
    createContext,
});

export const backendClient = initEdgeStoreClient({
    router: edgeStoreRouter,
})

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;