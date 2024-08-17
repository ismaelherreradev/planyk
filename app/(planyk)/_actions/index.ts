"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { lists, listTypesEnum, statusEnum, tasks, type Status } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { createServerActionProcedure } from "zsa";

const authedProcedure = createServerActionProcedure().handler(async () => {
  try {
    const user = await currentUser();

    return user;
  } catch {
    throw new Error("User not authenticated");
  }
});

export const createList = authedProcedure
  .createServerAction()
  .input(
    z.object({
      title: z.string().min(3),
      color: z.string().min(1),
      emoji: z.string().min(1),
      listType: z.nativeEnum(listTypesEnum),
    }),
  )
  .handler(async ({ input }) => {
    const { title, color, emoji, listType } = input;

    const [list] = await db
      .insert(lists)
      .values({
        title,
        listType,
        color,
        emoji,
      })
      .returning();

    revalidatePath("/lists");
    return list;
  });

export const createTask = authedProcedure
  .createServerAction()
  .input(
    z.object({
      listId: z.string().min(1),
      title: z.string().min(3),
      dateTime: z.date(),
    }),
  )
  .handler(async ({ input }) => {
    const { listId, title, dateTime } = input;
    const task = await db.insert(tasks).values({
      listId: Number(listId),
      title,
      status: "noted" as Status,
      dateTime: new Date(dateTime).toISOString(),
    });

    revalidatePath("/lists");
    return task;
  });

export const updateStateTask = authedProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.number(),
      status: z.nativeEnum(statusEnum),
    }),
  )
  .handler(async ({ input }) => {
    const { id, status } = input;
    await db
      .update(tasks)
      .set({
        status,
      })
      .where(eq(tasks.id, id));

    revalidatePath("/lists");
  });
