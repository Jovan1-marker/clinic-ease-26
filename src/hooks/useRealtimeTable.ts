import { useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export function useRealtimeTable(
  tableName: string,
  callback: () => void
) {
  useEffect(() => {
    const channel = supabase
      .channel(`realtime-${tableName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
        },
        () => {
          console.log(`🔄 ${tableName} table changed - refreshing...`);
          callback(); 
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName, callback]);
}
