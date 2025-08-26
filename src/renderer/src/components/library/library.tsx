import { FC, useState } from 'react'
import { LibraryElement } from './libraryElement'
import type { FileInfo } from '@renderer/types'
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { LibraryDragOverlay } from './LibraryDragOverlay'
import { getFileName } from '@renderer/functions/getFileName'
import { openedFolderAtom, openedFolderFilesAtom } from '@renderer/atoms'
import { reatomComponent } from '@reatom/npm-react'
import { getFolderTree } from '@renderer/functions/getFolderTree'
import { snapCenterToCursor } from '@dnd-kit/modifiers'

type LibraryProps = {
  fileInfo: FileInfo | null
}

export const Library: FC<LibraryProps> = reatomComponent(({ ctx, fileInfo }) => {
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const handleDragStart = (event) => {
    setActiveDragId(event.active.id)
  }

  const handleDragEnd = async (event) => {
    if (!event.over || event.over.id === event.active.id) return

    const activeFilePath = event.active.id.split('/').slice(0, -1).join('/')

    if (activeFilePath === event.over.id) return

    const moved = await window.api.moveFile(event.active.id, event.over.id)
    if (moved) {
      const links = await getFolderTree(ctx.get(openedFolderAtom) || '')
      openedFolderFilesAtom(ctx, links)
    }
    setActiveDragId(null)
  }

  // сенсор для запуска перетаскивания после отклонения в 3 пикселя
  // для устранения конфликта ссылок воутера и dnd перетаскивания
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3
      }
    })
  )

  if (!fileInfo) return <div></div>

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="pr-4 flex flex-col overflow-y-scroll overflow-x-hidden customScrollbar">
        <LibraryElement fileInfo={fileInfo} key={fileInfo.path} />
      </div>

      {/* компонент отображающийся при перетаскивании */}
      <DragOverlay modifiers={[snapCenterToCursor]}>
        {activeDragId ? <LibraryDragOverlay title={getFileName(activeDragId)} /> : null}
      </DragOverlay>
    </DndContext>
  )
})
