import React, { Component, Fragment } from 'react'
import { renderRoutes } from 'react-router-config'


class AppRoot extends Component {
  render() {
    return (
      <Fragment>
        {renderRoutes(this.props.route.routes)}
      </Fragment>
    )
  }
}


export default AppRoot
