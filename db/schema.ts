import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  integer,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const createTable = sqliteTableCreator((name) => `planyk_${name}`);

export const statusEnum = {
  NOTED: "noted",
  DELETED: "deleted",
  FINISHED: "finished",
} as const;

export type Status = (typeof statusEnum)[keyof typeof statusEnum];

export const lists = createTable(
  "list",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (t) => ({
    titleIndex: uniqueIndex("title_idx").on(t.title),
  }),
);

export type SelectList = typeof lists.$inferSelect;

export const tasks = createTable(
  "task",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    listId: integer("list_id")
      .notNull()
      .references(() => lists.id),
    title: text("description").notNull(),
    status: text("entity_type").$type<Status>().notNull(),
    dateTime: text("date_time").notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(() => new Date()),
  },
  (tasks) => ({
    listIdIndex: index("list_id_idx").on(tasks.listId),
  }),
);

export const listsRelations = relations(lists, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  list: one(lists, {
    fields: [tasks.listId],
    references: [lists.id],
  }),
}));
