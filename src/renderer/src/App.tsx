import { ContentPage } from './components/contentPage'
import { SidePanel } from './components/sidePanel'

function App(): React.JSX.Element {
  return (
    <div className="flex gap-2 w-full h-screen p-2">
      <SidePanel />
      <ContentPage />
    </div>
  )
}

export default App
