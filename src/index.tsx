import React from 'react'
import { render } from 'react-dom'
import { StateProvider } from './state/state'
import App from './components/App'
import './index.scss'

render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root'),
)
