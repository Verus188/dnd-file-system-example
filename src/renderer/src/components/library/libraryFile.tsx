import { getFileName } from '@renderer/functions/getFileName'
import { FileInfo } from '@renderer/types'
import { FC } from 'react'
import { Link } from 'wouter'

type LibraryFileProps = {
  fileInfo: FileInfo
}

export const LibraryFile: FC<LibraryFileProps> = ({ fileInfo }) => {
  return (
    <Link
      to={`/file/${encodeURIComponent(fileInfo.path)}`}
      className="truncate select-none cursor-pointer px-2 h-fit rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)] w-full flex items-center"
    >
      {getFileName(fileInfo.path)}
    </Link>
  )
}
