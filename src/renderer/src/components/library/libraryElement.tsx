import { FC } from 'react'

type LibraryElementProps = {
  link: string
}

export const LibraryElement: FC<LibraryElementProps> = ({ link }) => {
  return (
    <div className="select-none cursor-pointer px-2 h-fit rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)] flex border-4 border-[var(--color-border-dark-blue)] bg-[var(--color-background-dark-blue)]">
      {link}
    </div>
  )
}
