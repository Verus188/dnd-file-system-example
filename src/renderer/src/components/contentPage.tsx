import { Route, Switch } from 'wouter'
import { EmptyPage } from './pages/emptyPage'
import { SettingsPage } from './pages/settingsPage'
import { FilePage } from './pages/filePage'

export const ContentPage = () => {
  return (
    <div className=" overflow-x-hidden p-2 px-4 flex rounded-lg w-full h-full bg-[var(--color-background-asphalt)] border-[var(--color-border-asphalt)] border-4 overflow-y-scroll customScrollbar">
      <Switch>
        <Route path="/settings" component={() => <SettingsPage />} />
        <Route path="/file/:path" component={() => <FilePage />} />
        <Route>
          <EmptyPage />
        </Route>
      </Switch>
    </div>
  )
}
