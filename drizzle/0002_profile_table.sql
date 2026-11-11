CREATE TABLE profile (
  id INTEGER PRIMARY KEY,
  breed_slug TEXT,
  dog_name TEXT NOT NULL DEFAULT '',
  notes TEXT NOT NULL DEFAULT '',
  photo_blob_key TEXT,
  breed_photo_blob_key TEXT,
  is_example INTEGER NOT NULL DEFAULT 0,
  updated_at INTEGER NOT NULL
);
--> statement-breakpoint
DROP TABLE entries;
