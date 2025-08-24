import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={twMerge(
        'px-2 h-fit rounded-lg text-[var(--color-text-orange)] hover:bg-[var(--color-background-dark-blue-hovered)] flex items-center justify-center border-4 border-[var(--color-border-dark-blue)] bg-[var(--color-background-dark-blue)] active:translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
