import { FC } from 'react'

type LibraryDragOverlayProps = {
  title: string
}

export const LibraryDragOverlay: FC<LibraryDragOverlayProps> = ({ title }) => {
  return (
    <div className="select-none px-3 flex h-fit w-fit items-center bg-[var(--color-background-dark-blue-hovered)] border-2 border-[var(--color-border-dark-blue)] rounded-lg">
      {title}
    </div>
  )
}
