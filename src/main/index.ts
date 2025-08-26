import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join, basename } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { promises as fs } from 'fs'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openDirectory']
  })

  if (result.canceled) {
    return null
  }

  return result.filePaths[0]
})

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile']
  })

  if (result.canceled) {
    return null
  }

  return result.filePaths[0]
})

const isFileExists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

ipcMain.handle('isFolder', async (_, path: string): Promise<boolean> => {
  try {
    const stats = await fs.stat(path)
    return stats.isDirectory()
  } catch (error) {
    console.error(`Error checking if ${path} is a folder:`, error)
    return false
  }
})

ipcMain.handle('safe-read-folder', async (_, path: string): Promise<string[]> => {
  if (!(await isFileExists(path))) {
    return []
  }

  try {
    const files = await fs.readdir(path)
    return files
  } catch (error) {
    console.error(`Error reading folder ${path}:`, error)
    return []
  }
})

ipcMain.handle('safe-read-file', async (_, path: string): Promise<string | null> => {
  if (!(await isFileExists(path))) {
    return null
  }

  try {
    const fileContent = await fs.readFile(path, 'utf-8')
    if (!fileContent) {
      return null
    }

    return fileContent
  } catch (error) {
    console.error(`Error reading file ${path}:`, error)
    return null
  }
})

ipcMain.handle('move-file', async (event, path: string, newPath: string) => {
  try {
    const fileName = basename(path)
    const newFilePath = join(newPath, fileName)

    if (await isFileExists(newFilePath)) {
      // Запрос подтверждения замены у renderer через IPC
      const requestId = `${Date.now()}_${Math.random().toString(36).slice(2)}`
      event.sender.send('confirm-replace', {
        requestId,
        fileName,
        sourcePath: path,
        targetPath: newFilePath
      })

      const confirmed = await new Promise<boolean>((resolve) => {
        const channel = `confirm-replace-response:${requestId}`
        const handler = (_evt: Electron.IpcMainEvent, accepted: boolean) => {
          resolve(accepted)
        }
        ipcMain.once(channel, handler)
      })

      if (!confirmed) {
        return false
      }
    }

    await fs.rename(path, newFilePath)
    return true
  } catch (error) {
    console.error('Error moving file:', error)
    return false
  }
})
