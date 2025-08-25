export type FileInfo = {
  type: 'file' | 'folder'
  path: string
  children?: FileInfo[]
}
