import type { FileInfo } from '../types'

export const getFolderTree = async (rootPath: string): Promise<FileInfo> => {
  if (!(await window.api.isFolder(rootPath))) {
    return { type: 'file', path: rootPath }
  }

  const getFolderChildren = async (path: string): Promise<FileInfo[]> => {
    const files = await window.api.readFolder(path)
    const results: FileInfo[] = []
    for (const file of files) {
      const filePath = `${path}/${file}`
      const isFolder = await window.api.isFolder(filePath)
      const children = isFolder ? await getFolderChildren(filePath) : undefined
      results.push({ type: isFolder ? 'folder' : 'file', path: filePath, children })
    }
    return results
  }

  const result: FileInfo = {
    type: 'folder',
    path: rootPath,
    children: await getFolderChildren(rootPath)
  }

  return result
}
