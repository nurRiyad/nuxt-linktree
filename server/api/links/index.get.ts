import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  // List links for the current user
  const links = await useDb().select().from(tables.links).where(eq(tables.links.userId,user.id))

  return links
})