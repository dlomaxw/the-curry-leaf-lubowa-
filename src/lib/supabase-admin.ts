import { createClient } from "@supabase/supabase-js";

// Service-role client — server-only, bypasses RLS. Never import this from
// client code or expose SUPABASE_SERVICE_ROLE_KEY to the browser.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } },
);

export const DISH_IMAGES_BUCKET = "dish-images";
// Same bucket, kept separate by upload path (bar/... vs dishes/...).
export const BAR_IMAGES_BUCKET = "dish-images";
