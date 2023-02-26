export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser()
  if (user.value?.id)
    return navigateTo('/dashboard')
})
