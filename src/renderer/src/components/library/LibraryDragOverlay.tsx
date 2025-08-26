import { FC } from 'react'

type LibraryDragOverlayProps = {
  title: string
}

export const LibraryDragOverlay: FC<LibraryDragOverlayProps> = ({ title }) => {
  return (
    <div className="min-w-0 max-w-[125px] overflow-hidden select-none px-3 flex h-fit items-center text-[var(--color-border-dark-blue)] bg-[var(--color-text-orange)] border-2 border-[var(--color-border-dark-blue)] rounded-lg">
      <p className="truncate">{title}</p>
    </div>
  )
}
