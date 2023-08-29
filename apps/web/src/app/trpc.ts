// import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
// import { AppRouter } from '@server/trpc/trpc.router';

// export const trpc = createTRPCProxyClient<AppRouter>({
// 	links: [
// 		httpBatchLink({
// 			url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
// 		}),
// 	],
// });

import type { AppRouter } from "@server/trpc/trpc.router";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
