import { createCtx } from '@reatom/core'
import { SidePanel } from './components/sidePanel'
import { reatomContext } from '@reatom/npm-react'
import { Content } from './components/content'

const ctx = createCtx()
function App(): React.JSX.Element {
  return (
    <reatomContext.Provider value={ctx}>
      <div className="flex gap-2 w-full h-screen p-2">
        <SidePanel />
        <Content />
      </div>
    </reatomContext.Provider>
  )
}

export default App
