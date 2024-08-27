import { initEdgeStore } from "@edgestore/server";
import { initEdgeStoreClient } from '@edgestore/server/core';
import {
  CreateContextOptions,
  createEdgeStoreNextHandler,
} from "@edgestore/server/adapters/next/app";
import { z } from "zod";

type Context = {
  userId: string;
  userRole: "admin" | "user";
};

function createContext({ req }: CreateContextOptions): Context {
  // get the session from your auth provider
  // const session = getSession(req);
  return {
    userId: "1234",
    userRole: "user",
  };
}

const es = initEdgeStore.context<Context>().create();

const edgeStoreRouter = es.router({
  myPublicImages: es
    .imageBucket({
      maxSize: 1024 * 1024 * 1, // 1MB
    })
    .input(
      z.object({
        type: z.enum(["post", "profile"]),
      })
    )
    // e.g. /post/my-file.jpg
    .path(({ input }) => [{ type: input.type }]),

  myProtectedFiles: es
    .fileBucket()
    // e.g. /123/my-file.pdf
    .path(({ ctx }) => [{ owner: ctx.userId }])
    .accessControl({
      OR: [
        {
          userId: { path: "owner" },
        },
        {
          userRole: { eq: "admin" },
        },
      ],
    }),
});

const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
  createContext,
});

export const backendClient = initEdgeStoreClient({
    router: edgeStoreRouter,
    accessKey: process.env.EDGE_STORE_ACCESS_KEY,
    secretKey: process.env.EDGE_STORE_SECRET_KEY
  });
  

export { handler as GET, handler as POST };

export type EdgeStoreRouter = typeof edgeStoreRouter;