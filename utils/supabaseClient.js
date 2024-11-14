import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  // process.env.NEXT_PUBLIC_SUPABASE_URL,
  'https://axwqqoifubxkipmilrmm.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4d3Fxb2lmdWJ4a2lwbWlscm1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyMzQzMzEsImV4cCI6MTk5MjgxMDMzMX0.hXagLstTQVOeyM3sJYxTLrL2SwBF9mgjrGI8Us8A6a4'
  // process.env.NEXT_PUBLIC_SUPABASE_API_KEY
);

export default supabase;
