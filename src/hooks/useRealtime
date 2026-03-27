import { useEffect } from 'react';
import { supabase } from '../integrations/supabase/client'; 

export function RealtimeProvider() {
  useEffect(() => {
    console.log('🔴 Setting up global realtime subscription...');

    const channel = supabase
      .channel('global-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',        
          schema: 'public',
        },
        (payload) => {
          console.log('🔴 Realtime change received:', payload);
          console.log(`→ Table: ${payload.table} | Event: ${payload.eventType}`);
        }
      )
      .subscribe((status, err) => {
        if (status === 'SUBSCRIBED') {
          console.log('✅ Realtime successfully connected to all tables');
        } else if (err) {
          console.error('❌ Realtime subscription failed:', err);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
