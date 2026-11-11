// Actions for Mi Wuawua.
//
// The breed catalog lives in the client bundle (compiled at build time
// from the Dog API, dogapi.dog), so the app works fully locally. The
// server only stores the user's personal profile: the breed they marked
// with the paw button as their Wuawua, their dog's name, their notes,
// and the photos they upload (stored as blobs; only keys live in the DB).

import { defineAction, z, type ActionsModule, type Ctx } from "@hatch/space-sdk";
import * as schema from "./schema";

const profileOut = z.object({
  breed_slug: z.string().nullable(),
  dog_name: z.string(),
  notes: z.string(),
  is_example: z.boolean(),
  photo_url: z.string().nullable(),
  breed_photo_url: z.string().nullable(),
});

type ProfileOut = z.infer<typeof profileOut>;

async function loadProfile(ctx: Ctx): Promise<ProfileOut | null> {
  const db = ctx.db<typeof schema>();
  const rows = await db.select().from(schema.profile).limit(1);
  const row = rows[0];
  if (!row) return null;
  const [photoUrl, breedPhotoUrl] = await Promise.all([
    row.photoBlobKey ? ctx.blobs.getUrl(row.photoBlobKey) : null,
    row.breedPhotoBlobKey ? ctx.blobs.getUrl(row.breedPhotoBlobKey) : null,
  ]);
  return {
    breed_slug: row.breedSlug,
    dog_name: row.dogName,
    notes: row.notes,
    is_example: row.isExample,
    photo_url: photoUrl,
    breed_photo_url: breedPhotoUrl,
  };
}

async function upsertProfile(
  ctx: Ctx,
  patch: Partial<{
    breedSlug: string | null;
    dogName: string;
    notes: string;
    photoBlobKey: string | null;
    breedPhotoBlobKey: string | null;
    isExample: boolean;
  }>,
): Promise<ProfileOut> {
  const db = ctx.db<typeof schema>();
  const rows = await db.select().from(schema.profile).limit(1);
  const existing = rows[0];
  const now = new Date();
  if (existing) {
    await db
      .update(schema.profile)
      .set({ ...patch, updatedAt: now })
      .where(eqId(existing.id));
  } else {
    await db.insert(schema.profile).values({
      id: 1,
      breedSlug: patch.breedSlug ?? null,
      dogName: patch.dogName ?? "",
      notes: patch.notes ?? "",
      photoBlobKey: patch.photoBlobKey ?? null,
      breedPhotoBlobKey: patch.breedPhotoBlobKey ?? null,
      isExample: patch.isExample ?? false,
      updatedAt: now,
    });
  }
  const out = await loadProfile(ctx);
  if (!out) throw new Error("profile write failed");
  return out;
}

// Local helper so we don't need drizzle's eq import inline everywhere.
import { eq } from "drizzle-orm";
function eqId(id: number) {
  return eq(schema.profile.id, id);
}

export const Actions = {
  getProfile: defineAction({
    description:
      "Returns the user's personal Wuawua profile (marked breed, dog name, notes, photo URLs), or an empty profile when nothing is marked yet.",
    request: z.object({}),
    response: z.object({ profile: profileOut.nullable() }),
    async handler(ctx): Promise<{ profile: ProfileOut | null }> {
      return { profile: await loadProfile(ctx) };
    },
  }),

  seedExampleProfile: defineAction({
    description:
      "Seeds the featured example profile once: Tiny, a Red Nose Pitbull, pre-marked so the personal card shows how it works. Never overwrites an existing profile.",
    request: z.object({}),
    response: z.object({ seeded: z.boolean() }),
    async handler(ctx): Promise<{ seeded: boolean }> {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.profile).limit(1);
      if (rows[0]) return { seeded: false };
      await db.insert(schema.profile).values({
        id: 1,
        breedSlug: "red-nose-pitbull",
        dogName: "Tiny",
        notes: "",
        photoBlobKey: null,
        breedPhotoBlobKey: null,
        isExample: true,
        updatedAt: new Date(),
      });
      ctx.invalidateQueries();
      return { seeded: true };
    },
  }),

  markBreed: defineAction({
    description:
      "Marks a breed as the user's Wuawua (the paw button). This fills the personal card with that breed and ends the example state.",
    request: z.object({ breed_slug: z.string().min(1) }),
    response: z.object({ profile: profileOut }),
    async handler(ctx, args): Promise<{ profile: ProfileOut }> {
      const db = ctx.db<typeof schema>();
      const rows = await db.select().from(schema.profile).limit(1);
      const existing = rows[0];
      const wasExample = existing?.isExample ?? false;
      const profile = await upsertProfile(ctx, {
        breedSlug: args.breed_slug,
        isExample: false,
        // Leaving the example behind: the name and photos were Tiny's
        // example, so the personal card starts fresh for the user's dog.
        ...(wasExample
          ? { dogName: "", photoBlobKey: null, breedPhotoBlobKey: null }
          : {}),
      });
      ctx.invalidateQueries();
      return { profile };
    },
  }),

  saveProfileDetails: defineAction({
    description:
      "Saves the dog's name and/or the user's notes for their Wuawua personal card.",
    request: z.object({
      dog_name: z.string().max(80).optional(),
      notes: z.string().max(4000).optional(),
    }),
    response: z.object({ profile: profileOut }),
    async handler(ctx, args): Promise<{ profile: ProfileOut }> {
      const patch: Parameters<typeof upsertProfile>[1] = {};
      if (args.dog_name !== undefined) patch.dogName = args.dog_name;
      if (args.notes !== undefined) patch.notes = args.notes;
      const profile = await upsertProfile(ctx, patch);
      ctx.invalidateQueries();
      return { profile };
    },
  }),

  setPersonalPhoto: defineAction({
    description:
      "Stores the user's own dog photo for the front of their personal card (base64 image bytes).",
    request: z.object({
      data_base64: z.string().min(1),
      mime_type: z.string().min(1),
    }),
    response: z.object({ profile: profileOut }),
    async handler(ctx, args): Promise<{ profile: ProfileOut }> {
      const key = "profile/personal-photo";
      const bytes = Buffer.from(args.data_base64, "base64");
      await ctx.blobs.put(key, bytes, { contentType: args.mime_type });
      const profile = await upsertProfile(ctx, {
        photoBlobKey: key,
        isExample: false,
      });
      ctx.invalidateQueries();
      return { profile };
    },
  }),

  setBreedPhoto: defineAction({
    description:
      "Stores the photo shown on the featured example breed card (Tiny's card), uploaded by the owner (base64 image bytes).",
    request: z.object({
      data_base64: z.string().min(1),
      mime_type: z.string().min(1),
    }),
    response: z.object({ profile: profileOut }),
    async handler(ctx, args): Promise<{ profile: ProfileOut }> {
      const key = "profile/breed-photo";
      const bytes = Buffer.from(args.data_base64, "base64");
      await ctx.blobs.put(key, bytes, { contentType: args.mime_type });
      const profile = await upsertProfile(ctx, { breedPhotoBlobKey: key });
      ctx.invalidateQueries();
      return { profile };
    },
  }),
} satisfies ActionsModule;
