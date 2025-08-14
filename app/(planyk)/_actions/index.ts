'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import { lists, listTypesEnum, statusEnum, tasks, type Status } from '@/db/schema'
import { currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

async function requireAuth() {
  try {
    const user = await currentUser()
    if (!user) {
      redirect('/sign-in')
    }
    return user
  } catch {
    throw new Error('User not authenticated')
  }
}

const createListSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  color: z.string().min(1, { message: 'Color is required.' }),
  emoji: z.string().min(1, { message: 'Emoji is required.' }),
  listType: z.nativeEnum(listTypesEnum, { message: 'Invalid list type.' }),
})

const createTaskSchema = z.object({
  listId: z.string().min(1, { message: 'A list is required.' }),
  title: z.string().min(3, { message: 'Title must be at least 3 characters long.' }),
  dateTime: z.string().datetime({ message: 'Invalid date format.' }),
})

const updateTaskStatusSchema = z.object({
  id: z.coerce.number({ message: 'Invalid task ID.' }),
  status: z.nativeEnum(statusEnum, { message: 'Invalid status.' }),
})

const deleteListSchema = z.coerce.number({ message: 'Invalid list ID.' })

interface ActionState {
  message?: string
  errors?: Record<string, string[]>
  success?: boolean
}

export async function createList(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    const user = await requireAuth()

    const validatedFields = createListSchema.safeParse({
      title: formData.get('title'),
      color: formData.get('color'),
      emoji: formData.get('emoji'),
      listType: formData.get('listType'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Failed to create list. Please check the form.',
      }
    }

    const { title, color, emoji, listType } = validatedFields.data

    const [_list] = await db
      .insert(lists)
      .values({
        userId: user.id,
        title,
        listType,
        color,
        emoji,
      })
      .returning()

    revalidatePath('/lists')

    // Return success before redirect
    return {
      success: true,
      message: 'List created successfully!',
    }
  } catch (error) {
    console.error('Create list error:', error)
    return {
      message: 'Failed to create list. Please try again.',
    }
  }
}

export async function deleteList(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await requireAuth()

    const validatedId = deleteListSchema.safeParse(formData.get('id'))

    if (!validatedId.success) {
      return {
        message: 'Invalid list ID.',
      }
    }

    const id = validatedId.data

    await db.delete(tasks).where(eq(tasks.listId, id))
    await db.delete(lists).where(eq(lists.id, id))

    revalidatePath(`/lists/${id}`)

    return {
      success: true,
      message: 'List deleted successfully.',
    }
  } catch (error) {
    console.error('Delete list error:', error)
    return {
      message: 'Failed to delete list. Please try again.',
    }
  }
}

export async function createTask(prevState: ActionState, formData: FormData): Promise<ActionState> {
  try {
    await requireAuth()

    const validatedFields = createTaskSchema.safeParse({
      listId: formData.get('listId'),
      title: formData.get('title'),
      dateTime: formData.get('dateTime'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Failed to create task. Please check the form.',
      }
    }

    const { listId, title, dateTime } = validatedFields.data

    await db
      .insert(tasks)
      .values({
        listId: Number(listId),
        title,
        status: 'pending' as Status,
        dateTime: new Date(dateTime).toISOString(),
      })
      .returning()

    revalidatePath(`/lists/${listId}`)

    return {
      success: true,
      message: 'Task created successfully.',
    }
  } catch {
    return {
      message: 'Failed to create task. Please try again.',
    }
  }
}

export async function updateStateTask(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  try {
    await requireAuth()

    const validatedFields = updateTaskStatusSchema.safeParse({
      id: formData.get('id'),
      status: formData.get('status'),
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Failed to update task. Invalid data.',
      }
    }

    const { id, status } = validatedFields.data

    await db
      .update(tasks)
      .set({
        status,
      })
      .where(eq(tasks.id, id))

    const [task] = await db.select({ listId: tasks.listId }).from(tasks).where(eq(tasks.id, id))

    if (task) {
      revalidatePath(`/lists/${task.listId}`)
    }

    return {
      success: true,
      message: 'Task updated successfully.',
    }
  } catch {
    return {
      message: 'Failed to update task. Please try again.',
    }
  }
}

export async function updateTaskStatus(taskId: number, status: Status) {
  try {
    await requireAuth()

    const validatedFields = updateTaskStatusSchema.safeParse({
      id: taskId,
      status,
    })

    if (!validatedFields.success) {
      throw new Error('Invalid task data')
    }

    const { id, status: newStatus } = validatedFields.data

    await db
      .update(tasks)
      .set({
        status: newStatus,
      })
      .where(eq(tasks.id, id))

    const [task] = await db.select({ listId: tasks.listId }).from(tasks).where(eq(tasks.id, id))

    if (task) {
      revalidatePath(`/lists/${task.listId}`)
    }

    return { success: true }
  } catch {
    throw new Error('Failed to update task status')
  }
}
