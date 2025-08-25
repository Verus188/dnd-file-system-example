import { FC, useEffect, useState } from 'react'
import { useRoute } from 'wouter'

type FilePageProps = {}

export const FilePage: FC<FilePageProps> = () => {
  const [_, params] = useRoute('/file/:path')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!params || !params.path) return

    const decodedPath = decodeURIComponent(params.path)
    window.api.readFile(decodedPath).then((content) => {
      setContent(content ?? '')
    })
  }, [params?.path])

  return <div>{content}</div>
}
