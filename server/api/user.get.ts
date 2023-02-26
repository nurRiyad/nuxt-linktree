import { serverSupabaseClient } from '#supabase/server'
export default eventHandler(async (event) => {
  const supabaseClient = serverSupabaseClient(event)
  const query = getQuery(event)

  const userName = query.uid || ''

  const { data, error } = await supabaseClient
    .from('users')
    .select('user_name')
    .eq('auth_uid', userName)

  if (error)
    console.log(error)

  if (data) {
    if (data.length === 0)
      return {}
    const { user_name } = data[0]
    return { user_name }
  }
  else { return {} }
})
