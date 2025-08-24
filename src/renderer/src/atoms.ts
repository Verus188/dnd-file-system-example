import { action, atom, Ctx } from '@reatom/core'

export const prevRoute = atom<string | null>(null)

export const getPrevRoute = action((ctx: Ctx) => {
  const prev = ctx.get(prevRoute)
  return prev ?? ''
})
