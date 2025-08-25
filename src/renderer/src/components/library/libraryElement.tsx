import { FC } from 'react'
import type { FileInfo } from '@renderer/types'
import { LibraryFile } from './libraryFile'
import { LibraryFolder } from './libraryFolder'

type LibraryElementProps = {
  fileInfo: FileInfo
}

export const LibraryElement: FC<LibraryElementProps> = ({ fileInfo }) => {
  console.log(fileInfo)

  if (fileInfo.type === 'file') {
    return <LibraryFile fileInfo={fileInfo} />
  } else {
    return <LibraryFolder fileInfo={fileInfo} />
  }
}
