"use server";

import { currentUser } from "@clerk/nextjs/server";

import { db } from ".";
import type { Status } from "./schema";

async function getUser() {
  const user = await currentUser();
  return user ?? null;
}

export async function getListsWithTasks() {
  const user = await getUser();
  if (!user) return null;

  return await db.query.lists.findMany({
    where: (lists, { eq }) => eq(lists.userId, user.id),
    with: {
      tasks: {
        where: (tasks, { eq }) => eq(tasks.status, "pending"),
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

export async function getListsWithAllTasks() {
  const user = await getUser();
  if (!user) return null;

  return await db.query.lists.findMany({
    where: (lists, { eq }) => eq(lists.userId, user.id),
    with: {
      tasks: true,
    },
  });
}

export async function getListById(id: number) {
  const user = await getUser();
  if (!user) return null;

  return await db.query.lists.findFirst({
    where: (lists, { eq, and }) => and(eq(lists.id, id), eq(lists.userId, user.id)),
  });
}

export async function getTasksByListId(id: number) {
  const user = await getUser();
  if (!user) return null;

  return await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.listId, id),
  });
}
