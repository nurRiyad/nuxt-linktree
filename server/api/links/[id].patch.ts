import { eq, and } from 'drizzle-orm'
import { useValidatedParams, useValidatedBody, z, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  })
  const { name, url } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
    url: z.string().min(4).max(100),
  })
  const { user } = await requireUserSession(event)

  const link = await useDb()
    .update(tables.links)
    .set({
      name,
      url,
    })
    .where(and(eq(tables.links.id, id), eq(tables.links.userId, user.id)))
    .returning()
    .get()

  return link
})
