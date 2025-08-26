import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  // Returns a promise that resolves to the selected folder path or null
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  selectFile: () => ipcRenderer.invoke('select-file'),
  readFile: (path: string) => ipcRenderer.invoke('safe-read-file', path),
  readFolder: (path: string) => ipcRenderer.invoke('safe-read-folder', path),
  isFolder: (path: string) => ipcRenderer.invoke('isFolder', path),
  moveFile: (source: string, destination: string): Promise<boolean> =>
    ipcRenderer.invoke('move-file', source, destination),
  // Событие на подтверждение замены файла (вызывается из main)
  onConfirmReplace: (
    listener: (payload: { requestId: string; fileName: string; sourcePath: string; targetPath: string }) => void
  ) => {
    const handler = (_: Electron.IpcRendererEvent, payload: any) => listener(payload)
    ipcRenderer.on('confirm-replace', handler)
    return () => ipcRenderer.removeListener('confirm-replace', handler)
  },
  // Ответ main-процессу по конкретному запросу
  replyConfirmReplace: (requestId: string, accepted: boolean) => {
    ipcRenderer.send(`confirm-replace-response:${requestId}`, accepted)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
