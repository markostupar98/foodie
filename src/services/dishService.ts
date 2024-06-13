import { supabase } from "../lib/supabase";

export const getDishes = async () => {
  const { data, error } = await supabase
    .from('dishes')
    .select('*');
  if (error) throw error;
  return data;
};
