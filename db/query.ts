"use server";

import { currentUser } from "@clerk/nextjs/server";

import { db } from ".";

async function getUser() {
  const user = await currentUser();
  return user || null;
}

export async function getListsWithTasks() {
  const user = await getUser();
  if (!user) return null;

  return await db.query.lists.findMany({
    where: (lists, { eq }) => eq(lists.userId, user.id),
    with: {
      tasks: {
        where: (tasks, { eq }) => eq(tasks.status, "noted"),
      },
    },
  });
}

export async function getLists() {
  const user = await getUser();
  if (!user) return null;

  return await db.query.lists.findMany({
    where: (lists, { eq }) => eq(lists.userId, user.id),
  });
}

export async function getTaskById(id: number) {
  const user = await getUser();
  if (!user) return null;

  return await db.query.tasks.findMany({
    where: (tasks, { eq, and }) => and(eq(tasks.listId, id), eq(tasks.status, "noted")),
  });
}
