import { createClient } from "@supabase/supabase-js";
import envUtils from "./envVars";

const supabase = createClient(
  envUtils.NEXT_PUBLIC_SUPABASE_URL,
  envUtils.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default supabase;
