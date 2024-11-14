import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  // process.env.NEXT_PUBLIC_SUPABASE_URL,
  'https://axwqqoifubxkipmilrmm.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default supabase;
