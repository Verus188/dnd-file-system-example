import { FC } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {}

export const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  return (
    <button
      className={twMerge(
        'px-2 h-fit rounded-lg text-[var(--color-background-dark-blue)] hover:opacity-90 flex items-center justify-center border-2 border-[var(--color-border-dark-blue)] bg-[var(--color-text-orange)] active:translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
