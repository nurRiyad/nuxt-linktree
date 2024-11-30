import { eq, and } from 'drizzle-orm'
import { useValidatedParams, zh } from 'h3-zod'

export default eventHandler(async (event) => {
  const { id } = await useValidatedParams(event, {
    id: zh.intAsString,
  })

  const { user } = await requireUserSession(event)

  const deletedTodo = await useDb()
    .delete(tables.links)
    .where(and(eq(tables.links.id, id), eq(tables.links.userId, user.id)))
    .returning()
    .get()

  if (!deletedTodo) {
    throw createError({
      statusCode: 404,
      message: 'Todo not found',
    })
  }
  return deletedTodo
})
