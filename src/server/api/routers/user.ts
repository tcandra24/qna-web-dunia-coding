import { createTRPCRouter, publicProcedure } from "../trpc";

export const useRouter = createTRPCRouter({
  getProfileByUsername: publicProcedure.input().query(),
});
