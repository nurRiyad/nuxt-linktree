import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  const url = `https://api.github.com/users/${id}`
  const data = await $fetch<Record<string, unknown>>(url)

  const gitHubId = data.id as number

  // List links for the current user
  const links = await useDb().select().from(tables.links).where(eq(tables.links.userId, gitHubId))

  return { links, data }
})
