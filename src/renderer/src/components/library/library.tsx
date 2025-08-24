import { FC } from 'react'
import { LibraryElement } from './libraryElement'

type LibraryProps = {
  links: string[]
}

export const Library: FC<LibraryProps> = ({ links }) => {
  return (
    <div className="pr-4 flex flex-col gap-2 overflow-y-scroll customScrollbar">
      {links.map((link) => (
        <LibraryElement link={link} key={link} />
      ))}
    </div>
  )
}
