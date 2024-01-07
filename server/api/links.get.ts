import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'
import type { Database } from '@/types/supabase'

export default eventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const query = getQuery(event)

  const collectionId = query.id || ''

  if (collectionId) {
    const { data, error } = await client.from('links')
      .select('*')
      .eq('col_id', collectionId)

    if (error)
      return []
    else return data
  }
  else {
    return []
  }
})
