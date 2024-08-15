"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { lists, tasks, type Status } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
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
    }),
    {
      type: "formData",
    },
  )
  .handler(async ({ input }) => {
    const { title } = input;

    const list = await db
      .insert(lists)
      .values({
        title,
      })
      .returning({
        title: lists.title,
      });

    revalidatePath("/dashboard");
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
    console.log(input);

    const { listId, title, dateTime } = input;
    const task = await db.insert(tasks).values({
      listId: Number(listId),
      title,
      status: "noted" as Status,
      dateTime: new Date(dateTime).toISOString(),
    });

    revalidatePath("/dashboard");
    return task;
  });
