import { FC, useState } from 'react'
import { LibraryElement } from './libraryElement'
import type { FileInfo } from '@renderer/types'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { LibraryDragOverlay } from './LibraryDragOverlay'
import { isDraggingAtom } from '@renderer/atoms'
import { reatomComponent } from '@reatom/npm-react'
import { get } from 'http'
import { getFileName } from '@renderer/functions/getFileName'

type LibraryProps = {
  fileInfo: FileInfo | null
}

export const Library: FC<LibraryProps> = reatomComponent(({ ctx, fileInfo }) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id)
    isDraggingAtom(ctx, true)
  }

  const handleDragEnd = () => {
    setActiveDragId(null)
    isDraggingAtom(ctx, false)
  }

  if (!fileInfo) return <div></div>

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="pr-4 flex flex-col overflow-y-scroll overflow-x-hidden customScrollbar">
        <LibraryElement fileInfo={fileInfo} key={fileInfo.path} />
      </div>

      <DragOverlay>
        {activeDragId ? <LibraryDragOverlay title={getFileName(activeDragId)} /> : null}
      </DragOverlay>
    </DndContext>
  )
})
