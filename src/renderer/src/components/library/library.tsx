import { FC, useState } from 'react'
import { LibraryElement } from './libraryElement'
import type { FileInfo } from '@renderer/types'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { LibraryDragOverlay } from './LibraryDragOverlay'
import { getFileName } from '@renderer/functions/getFileName'

type LibraryProps = {
  fileInfo: FileInfo | null
}

export const Library: FC<LibraryProps> = ({ fileInfo }) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id)
  }

  const handleDragEnd = () => {
    setActiveDragId(null)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    })
  )

  if (!fileInfo) return <div></div>

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="pr-4 flex flex-col overflow-y-scroll overflow-x-hidden customScrollbar">
        <LibraryElement fileInfo={fileInfo} key={fileInfo.path} />
      </div>

      <DragOverlay>
        {activeDragId ? <LibraryDragOverlay title={getFileName(activeDragId)} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
