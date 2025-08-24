import { Link } from 'wouter'
import { ContentPage } from './contentPage'

export const Content = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg w-full h-full">
      <div className="flex w-full justify-end">
        <Link
          to={'/settings'}
          className="px-2 py-1 border-4 border-[var(--color-border-asphalt)] rounded-lg bg-[var(--color-background-asphalt)] hover:bg-[var(--color-background-hovered-asphalt)]"
        >
          Settings
        </Link>
      </div>
      <ContentPage />
    </div>
  )
}
