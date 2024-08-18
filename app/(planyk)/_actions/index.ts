"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
      title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
      color: z.string().min(1),
      emoji: z.string().min(1),
      listType: z.nativeEnum(listTypesEnum),
    }),
  )
  .handler(async ({ ctx, input }) => {
    const { title, color, emoji, listType } = input;

    const [list] = await db
      .insert(lists)
      .values({
        userId: ctx.id,
        title,
        listType,
        color,
        emoji,
      })
      .returning();

    revalidatePath("/lists");
  });

export const deleteList = authedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    const id = input;

    await db.delete(tasks).where(eq(tasks.listId, id));
    await db.delete(lists).where(eq(lists.id, id));

    revalidatePath("/lists");
    redirect("/lists");
  });

export const createTask = authedProcedure
  .createServerAction()
  .input(
    z.object({
      listId: z.string().min(1, { message: "A list is required." }),
      title: z.string().min(3, { message: "Title must be at least 3 characters long." }),
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
