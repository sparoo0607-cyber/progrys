"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  
  return users.map(user => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role as "user" | "admin",
    // We map isVerified to status to avoid schema changes
    status: user.isVerified ? "active" : "banned", 
    createdAt: user.createdAt.toISOString(),
    purchases: 0, // Mock purchases as it's not present in User
  }));
}

export async function updateUserRole(id: string, role: "user" | "admin") {
  await prisma.user.update({
    where: { id },
    data: { role },
  });
  revalidatePath("/admin/users");
}

export async function updateUserStatus(id: string, status: "active" | "banned") {
  await prisma.user.update({
    where: { id },
    data: { isVerified: status === "active" },
  });
  revalidatePath("/admin/users");
}

export async function deleteUserAction(id: string) {
  await prisma.user.delete({
    where: { id },
  });
  revalidatePath("/admin/users");
}
