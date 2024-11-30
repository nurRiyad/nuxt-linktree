import { useValidatedBody, z } from 'h3-zod'

export default eventHandler(async (event) => {
  const { name, url } = await useValidatedBody(event, {
    name: z.string().min(1).max(100),
    url: z.string().min(4).max(100),
  })
  const { user } = await requireUserSession(event)

  // Insert link for the current user

  try {
    const link = await useDb()
      .insert(tables.links)
      .values({
        userId: user.id,
        name,
        url,
        createdAt: new Date(),
      })
      .returning()
      .get()

    return link
  } catch (error) {
    if ((error as Record<string, unknown>).code === 'SQLITE_CONSTRAINT') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Link already exists',
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message || 'Failed to create link',
    })
  }
})
