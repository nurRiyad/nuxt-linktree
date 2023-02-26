import { serverSupabaseClient } from '#supabase/server'
export default eventHandler(async (event) => {
  const supabaseClient = serverSupabaseClient(event)
  const query = getQuery(event)

  const userName = query.uname || ''
  const collectionName = query.cname || ''

  const { data, error } = await supabaseClient
    .from('links')
    .select('name, url, id')
    .eq('user_name', userName)
    .eq('collection_name', collectionName)

  if (error)
    return []
  else return data
})
