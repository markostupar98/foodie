import { useEffect } from "react";
import { supabase } from "../lib/supabase";

useEffect(() => {
  const subscription = supabase
    .from("orders")
    .on("INSERT", (response) => {
      const order = response.new;
      console.log("New order needs a driver:", order);
      // Implement notification logic here
    })
    .subscribe();

  return () => supabase.removeSubscription(subscription);
}, []);
