import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      selectFolder: () => Promise<string | null>
      selectFile: () => Promise<string | null>
      readFile: (path: string) => Promise<string | null>
      readFolder: (path: string) => Promise<string[]>
      isFolder: (path: string) => Promise<boolean>
      moveFile: (source: string, destination: string) => Promise<boolean>
      onConfirmReplace: (
        listener: (payload: {
          requestId: string
          fileName: string
          sourcePath: string
          targetPath: string
        }) => void
      ) => () => void
      replyConfirmReplace: (requestId: string, accepted: boolean) => void
    }
  }
}
