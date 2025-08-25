import { getFileName } from '@renderer/functions/getFileName'
import { FileInfo } from '@renderer/types'
import { FC } from 'react'
import { LibraryElement } from './libraryElement'

type LibraryFolderProps = {
  fileInfo: FileInfo
}

export const LibraryFolder: FC<LibraryFolderProps> = ({ fileInfo }) => {
  return (
    <div className="border-3 border-blue-500">
      {getFileName(fileInfo.path)}
      {fileInfo.children?.map((child) => {
        return <LibraryElement fileInfo={child} key={child.path} />
      })}
    </div>
  )
}
