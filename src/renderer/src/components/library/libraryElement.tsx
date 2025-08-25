import { FC } from 'react'
import type { FileInfo } from '@renderer/types'
import { LibraryFile } from './libraryFile'
import { LibraryFolder } from './libraryFolder'
import { DraggableAttributes, useDraggable } from '@dnd-kit/core'
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'

export type DragParams = {
  setNodeRef: (element: HTMLElement | null) => void
  attributes: DraggableAttributes
  listeners: SyntheticListenerMap | undefined
}

type LibraryElementProps = {
  fileInfo: FileInfo
}

export const LibraryElement: FC<LibraryElementProps> = ({ fileInfo }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: fileInfo.path
  })

  const dragParams: DragParams = {
    setNodeRef,
    attributes,
    listeners
  }

  return (
    <div className="flex flex-col w-[92%] select-none" title={fileInfo.path}>
      {fileInfo.type === 'file' ? (
        <LibraryFile fileInfo={fileInfo} dragParams={dragParams} />
      ) : (
        <LibraryFolder fileInfo={fileInfo} dragParams={dragParams} />
      )}
    </div>
  )
}
