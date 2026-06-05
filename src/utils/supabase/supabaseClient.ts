// Supabase Client using @supabase/supabase-js
// This client can be used for direct database operations
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl, supabaseAnonKey } from '../../../utils/supabase/info';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
