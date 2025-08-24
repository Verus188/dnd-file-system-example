import { Button } from './button'

export const SidePanel = () => {
  return (
    <div className="p-2 min-w-[250px] w-1/2 rounded-lg flex flex-col h-full bg-[var(--color-background-asphalt)] border-[var(--color-border-asphalt)] border-4">
      <div className="flex w-full pt-20 justify-center">
        <Button
          className="text-xl w-[80%]"
          onClick={async () => {
            const path = await window.api.selectFolder()
          }}
        >
          Open folder
        </Button>
      </div>
    </div>
  )
}
