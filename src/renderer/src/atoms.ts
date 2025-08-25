import { action, atom, Ctx } from '@reatom/core'
import type { FileInfo } from './types'

export const prevRoute = atom<string | null>(null)

export const getPrevRoute = action((ctx: Ctx) => {
  const prev = ctx.get(prevRoute)
  return prev ?? ''
})

// открытая папка в боковой панели
export const openedFolderAtom = atom<string | null>(null)

export const openedFolderFilesAtom = atom<FileInfo | null>(null)

export const idDraggingAtom = atom<boolean>(false)
