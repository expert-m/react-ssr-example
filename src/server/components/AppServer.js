import React, { PureComponent } from 'react'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import routes from '../../routes'


export default class AppServer extends PureComponent {
  render() {
    const {
      store,
      context,
      location,
    } = this.props

    return (
      <Provider store={store}>
        <StaticRouter context={context} location={location}>
          {renderRoutes(routes)}
        </StaticRouter>
      </Provider>
    )
  }
}
