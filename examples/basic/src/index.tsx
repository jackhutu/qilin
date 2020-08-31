import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './modules'
import routes from './routes'
import './index.less'

const App = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>{renderRoutes(routes)}</ConnectedRouter>
    </Provider>
  )
}

render(<App />, document.querySelector('#root'))
