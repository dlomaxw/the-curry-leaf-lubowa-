// One-off setup: create the public storage bucket used for dish image
// uploads if it doesn't already exist. Run with: npx tsx scripts/ensure-bucket.ts
import { supabaseAdmin, DISH_IMAGES_BUCKET } from "../src/lib/supabase-admin";

async function main() {
  const { data: buckets, error: listError } =
    await supabaseAdmin.storage.listBuckets();
  if (listError) throw listError;

  if (buckets.some((b) => b.name === DISH_IMAGES_BUCKET)) {
    console.log(`Bucket "${DISH_IMAGES_BUCKET}" already exists.`);
    return;
  }

  const { error: createError } = await supabaseAdmin.storage.createBucket(
    DISH_IMAGES_BUCKET,
    {
      public: true,
      fileSizeLimit: "5MB",
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    },
  );
  if (createError) throw createError;
  console.log(`Created public bucket "${DISH_IMAGES_BUCKET}".`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
