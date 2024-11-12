import { eq } from 'drizzle-orm'

export default eventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  console.log('user logged in ',user.id)

  const db = useDb()

  console.log('db connection done')


  // List links for the current user
  const links = await db.select().from(tables.links).where(eq(tables.links.userId,user.id))

  return links
})