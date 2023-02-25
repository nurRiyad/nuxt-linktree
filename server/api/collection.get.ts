import { serverSupabaseClient } from '#supabase/server'
export default eventHandler(async (event) => {
  const supabaseClient = serverSupabaseClient(event)
  const query = getQuery(event)

  const userName = query.uname || ''

  const { data, error } = await supabaseClient
    .from('collections')
    .select('user_name, collection_name, description')
    .eq('user_name', userName)

  if (error)
    return []
  else return data
})
