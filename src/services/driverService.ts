// Register Driver

import { supabase } from "../lib/supabase";

export const handleDriverRegister = async () => {
    const { data, error } = await supabase
      .from('drivers')
      .insert([{ full_name, email, phone, vehicle_type: vehicleType }]);

    if (error) console.error(error.message);
    else console.log('Driver registered:', data);
  };
