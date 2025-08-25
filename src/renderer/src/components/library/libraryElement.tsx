import { FC } from 'react'
import type { FileInfo } from '@renderer/types'
import { LibraryFile } from './libraryFile'
import { LibraryFolder } from './libraryFolder'

type LibraryElementProps = {
  fileInfo: FileInfo
}

export const LibraryElement: FC<LibraryElementProps> = ({ fileInfo }) => {
  return (
    <div className="flex flex-col w-[92%] select-none" title={fileInfo.path}>
      {fileInfo.type === 'file' ? (
        <LibraryFile fileInfo={fileInfo} />
      ) : (
        <LibraryFolder fileInfo={fileInfo} />
      )}
    </div>
  )
}
