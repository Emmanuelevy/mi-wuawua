// Drizzle schema for Mi Wuawua.
//
// The breed catalog is fixed editorial content compiled into the client
// bundle at build time (the app works fully locally, per the owner's
// requirement). The only stored state is the user's personal profile:
// which breed they marked with the paw button as their Wuawua, their
// dog's name, their notes, and the photos they uploaded.

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const profile = sqliteTable("profile", {
  id: integer("id").primaryKey(),
  breedSlug: text("breed_slug"),
  dogName: text("dog_name").notNull().default(""),
  notes: text("notes").notNull().default(""),
  photoBlobKey: text("photo_blob_key"),
  breedPhotoBlobKey: text("breed_photo_blob_key"),
  isExample: integer("is_example", { mode: "boolean" }).notNull().default(false),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
});
