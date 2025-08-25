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
      className="truncate select-none cursor-pointer px-2 h-fit rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)]  w-full flex items-center"
    >
      {getFileName(fileInfo.path)}
    </div>
  )
}
