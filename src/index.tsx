import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './assets/sass/app.scss'
import { AppProvider } from './providers/app'
import { AppRoute } from './routers/app'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <AppRoute />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
