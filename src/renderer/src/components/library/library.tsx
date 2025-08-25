import { FC } from 'react'
import { LibraryElement } from './libraryElement'
import type { FileInfo } from '@renderer/types'
import { DndContext } from '@dnd-kit/core'

type LibraryProps = {
  fileInfo: FileInfo | null
}

export const Library: FC<LibraryProps> = ({ fileInfo }) => {
  if (!fileInfo) return <div></div>

  return (
    <DndContext>
      <div className="pr-4 flex flex-col overflow-y-scroll overflow-x-hidden customScrollbar">
        <LibraryElement fileInfo={fileInfo} key={fileInfo.path} />
      </div>
    </DndContext>
  )
}
