import prisma from "@/lib/prisma";
import { UpdateUserData } from "@/types";

export class UserService {
  static async getUser(userId: string) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  static async updateUser(userId: string, data: UpdateUserData) {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }
}
