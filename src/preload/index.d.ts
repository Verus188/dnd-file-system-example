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
    }
  }
}
