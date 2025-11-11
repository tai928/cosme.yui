import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Experiment = {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  full_description: string;
  experiment_type: string;
  created_at: string;
};
