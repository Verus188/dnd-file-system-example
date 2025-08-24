import QuestionMarkImage from '@assets/questionmark.svg?react'

export const EmptyPage = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <QuestionMarkImage className="w-1/5 text-[var(--color-text-orange)] bg-[var(--color-background-aphalt)] border-2 border-[var(--color-text-orange)] p-4 rounded-full" />
    </div>
  )
}
