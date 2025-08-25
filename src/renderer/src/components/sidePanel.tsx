import { reatomComponent } from '@reatom/npm-react'
import { Button } from './button'
import { openedFolderAtom, openedFolderFilesAtom } from '@renderer/atoms'
import { Library } from './library/library'
import { getFolderTree } from '@renderer/functions/getFolderTree'

export const SidePanel = reatomComponent(({ ctx }) => {
  const openedFolder = ctx.spy(openedFolderAtom)
  const openedFolderFiles = ctx.spy(openedFolderFilesAtom)

  return (
    <div className="p-2 min-w-[250px] w-1/2 rounded-lg flex flex-col h-full bg-[var(--color-background-asphalt)] border-[var(--color-border-asphalt)] border-4">
      {openedFolder ? (
        <Library fileInfo={openedFolderFiles} />
      ) : (
        <Button
          className="text-xl h-fit w-[80%] mt-20 self-center"
          onClick={async () => {
            const path = await window.api.selectFolder()
            openedFolderAtom(ctx, path)

            if (!path) return

            const links = await getFolderTree(path)
            // console.log(links)

            openedFolderFilesAtom(ctx, links)
          }}
        >
          Open folder
        </Button>
      )}
    </div>
  )
})
