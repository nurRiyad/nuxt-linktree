import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const { name,url } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
    url: z.string().min(4).max(100)
  })
  const { user } = await requireUserSession(event)
  const db =  useDb()

  // Insert link for the current user
  const link = await db.insert(tables.links).values({
    userId: user.id,
    name,
    url,
    createdAt: new Date()
  }).returning().get()

  return link
})
