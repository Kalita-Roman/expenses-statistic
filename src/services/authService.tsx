import { auth } from "@/auth.config";
import { prisma } from "@/services/prismaService";

export const getAuthUserId = async () => {
  const session = await auth();
  console.log(">>> getAuthUserId > session", { session });
  const id = session?.user?.id;
  if (!id) {
    throw new Error("User id not found");
  }
  const idNum = parseInt(id);
  return idNum;
};

export const getUserId = async () => {
  const authUserId = await getAuthUserId();

  if (!authUserId) {
    throw new Error("User not found");
  }

  const existingUser = await prisma.users.findFirst({
    where: {
      auth_id: authUserId,
    },
  });

  if (existingUser) {
    return existingUser.id;
  } else {
    const newUser = await prisma.users.create({
      data: {
        auth_id: authUserId,
      },
    });
    return newUser.id;
  }
};
