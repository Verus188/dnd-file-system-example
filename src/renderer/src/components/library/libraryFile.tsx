import { getFileName } from '@renderer/functions/getFileName'
import { FileInfo } from '@renderer/types'
import { FC } from 'react'
import { Link } from 'wouter'
import { DragParams } from './libraryElement'

type LibraryFileProps = {
  fileInfo: FileInfo
  dragParams: DragParams
}

export const LibraryFile: FC<LibraryFileProps> = ({ fileInfo, dragParams }) => {
  const { setNodeRef, attributes, listeners } = dragParams

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      <Link
        to={`/file/${encodeURIComponent(fileInfo.path)}`}
        className="truncate select-none cursor-pointer px-2 h-fit rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)] w-full flex items-center"
      >
        {getFileName(fileInfo.path)}
      </Link>
    </div>
  )
}
