import { Route, Switch } from 'wouter'
import { EmptyPage } from './pages/emptyPage'
import { SettingsPage } from './pages/settingsPage'

export const ContentPage = () => {
  return (
    <div className="p-2 flex rounded-lg w-full h-full bg-[var(--color-background-asphalt)] border-[var(--color-border-asphalt)] border-4">
      <Switch>
        <Route path="/settings" component={() => <SettingsPage />} />
        <Route>
          <EmptyPage />
        </Route>
      </Switch>
    </div>
  )
}
