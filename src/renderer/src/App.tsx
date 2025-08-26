import { createCtx } from '@reatom/core'
import { SidePanel } from './components/sidePanel'
import { reatomContext } from '@reatom/npm-react'
import { Content } from './components/content'
import { useEffect, useState } from 'react'
import { ConfirmReplaceModal } from './components/confirmReplaceModal'

const ctx = createCtx()
function App(): React.JSX.Element {
  const [confirmData, setConfirmData] = useState<{
    requestId: string
    fileName: string
  } | null>(null)

  useEffect(() => {
    const unsubscribe = window.api.onConfirmReplace((payload) => {
      setConfirmData({ requestId: payload.requestId, fileName: payload.fileName })
    })
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  const handleConfirm = () => {
    if (confirmData) {
      window.api.replyConfirmReplace(confirmData.requestId, true)
      setConfirmData(null)
    }
  }

  const handleCancel = () => {
    if (confirmData) {
      window.api.replyConfirmReplace(confirmData.requestId, false)
      setConfirmData(null)
    }
  }

  return (
    <reatomContext.Provider value={ctx}>
      <div className="flex gap-2 w-full h-screen p-2">
        <SidePanel />
        <Content />
      </div>
      <ConfirmReplaceModal
        open={!!confirmData}
        fileName={confirmData?.fileName ?? null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </reatomContext.Provider>
  )
}

export default App
