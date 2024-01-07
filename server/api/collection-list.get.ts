import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '@/types/supabase'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const user = await serverSupabaseUser(event)

  if (user?.id) {
    const { data, error } = await client.from('collection')
      .select('id, name, description')
      .eq('user_id', user.id)

    if (error)
      return []
    else return data
  }
  else {
    return []
  }
})
