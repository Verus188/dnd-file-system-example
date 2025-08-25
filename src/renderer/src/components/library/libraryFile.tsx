import { getFileName } from '@renderer/functions/getFileName'
import { FileInfo } from '@renderer/types'
import { FC } from 'react'

type LibraryFileProps = {
  fileInfo: FileInfo
}

export const LibraryFile: FC<LibraryFileProps> = ({ fileInfo }) => {
  return (
    <div
      title={fileInfo.path}
      className="truncate select-none cursor-pointer px-2 h-10 rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)] border-4 border-[var(--color-border-dark-blue)] bg-[var(--color-background-dark-blue)] w-full min-h-10 flex items-center"
    >
      {getFileName(fileInfo.path)}
    </div>
  )
}
