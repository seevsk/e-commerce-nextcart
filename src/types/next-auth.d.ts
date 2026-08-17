import type { User as PrismaUser } from "@/generated/prisma/client";

export type SessionUser = Omit<PrismaUser, "password">;

declare module "@auth/core/types" {
  interface Session {
    user: SessionUser;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    data: SessionUser;
  }
}
