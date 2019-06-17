import React from 'react'
import ReactDOM from 'react-dom'
import AppClient from './components/AppClient'
import configureStore from '../store'

const store = configureStore(window.__PRELOADED_STATE__ || {})

const render = Component => {
  ReactDOM.hydrate(
    <Component store={store}/>,
    document.getElementById('root'),
  )
}

render(AppClient)

if (module.hot) {
  module.hot.accept('./components/AppClient', () => {
    render(AppClient)
  })
}
