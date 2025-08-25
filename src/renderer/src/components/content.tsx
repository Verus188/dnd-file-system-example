import { Link, useLocation } from 'wouter'
import { ContentPage } from './contentPage'
import { reatomComponent } from '@reatom/npm-react'
import { useEffect, useRef } from 'react'
import { prevRoute } from '../atoms'

export const Content = reatomComponent(({ ctx }) => {
  const [location, _] = useLocation()
  const prevRef = useRef<string>('')

  console.log(location)

  useEffect(() => {
    prevRoute(ctx, prevRef.current || '')
    prevRef.current = location
  }, [location])

  return (
    <div className="flex flex-col gap-2 rounded-lg w-full h-full">
      <div className="flex w-full justify-end">
        <Link
          to={location === '/settings' ? prevRef.current : '/settings'}
          className="active:translate-y-0.5 px-2 py-1 border-4 border-[var(--color-border-asphalt)] rounded-lg bg-[var(--color-background-asphalt)] hover:bg-[var(--color-background-asphalt-hovered)]"
        >
          Settings
        </Link>
      </div>
      <ContentPage />
    </div>
  )
})
