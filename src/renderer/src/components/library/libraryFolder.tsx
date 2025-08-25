import { getFileName } from '@renderer/functions/getFileName'
import { FileInfo } from '@renderer/types'
import { FC, useState } from 'react'
import { DragParams, LibraryElement } from './libraryElement'
import ArrowImage from '@assets/dropdownarrow.svg?react'

type LibraryFolderProps = {
  fileInfo: FileInfo
  dragParams: DragParams
}

export const LibraryFolder: FC<LibraryFolderProps> = ({ fileInfo, dragParams }) => {
  const [isOpen, setIsOpen] = useState(false)

  const { setNodeRef, attributes, listeners } = dragParams

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={() => setIsOpen(!isOpen)}
        className=" px-2 flex h-fit gap-2 items-center hover:bg-[var(--color-background-dark-blue-hovered)] rounded-lg"
      >
        <div>
          <ArrowImage
            className={`text-[var(--color-text-orange)] size-3 ${isOpen ? '-rotate-90' : '-rotate-180'}`}
          />
        </div>
        {getFileName(fileInfo.path)}
      </div>
      <div className={`${isOpen ? 'flex' : 'hidden'} flex-col items-end gap-1`}>
        {fileInfo.children?.map((child) => {
          return <LibraryElement fileInfo={child} key={child.path} />
        })}
      </div>
    </>
  )
}
