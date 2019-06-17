import React from 'react'
import ReactDOMServer from 'react-dom/server'
import AppServer from './components/AppServer'
import configureStore from '../store'
import { matchRoutes } from 'react-router-config'
import routes from '../routes'
import serialize from 'serialize-javascript'
import assets from '../../build/manifest.json'


assets.scripts = Object.keys(assets).filter(fileName => (
  fileName.includes('.js')
)).map(fileName => assets[fileName])


export default class SSR {
  constructor(req, res) {
    this.req = req
    this.res = res
  }

  async render() {
    const context = {}
    const store = configureStore({})

    await this.fetchData({ store })

    const html = this.renderElement({ context, store })

    if (context.url) {
      const status = context.status || 301
      this.res.redirect(status, context.url)
      return
    }

    const status = context.status || 200
    this.res.status(status)

    this.res.render('./prod.tpl.ejs', {
      initialState: serialize(store.getState(), { isJSON: true }),
      app: html,
      assets,
    })
  }

  fetchData({ store }) {
    const [path, search] = this.req.url.split('?')
    const branch = matchRoutes(routes, path)

    const promises = branch.map(({ route, match }) => {
      const fetchData = route.component.fetchData

      if (fetchData instanceof Function) {
        return fetchData({
          dispatch: store.dispatch,
          match: match.params,
          location: {
            path,
            search: search || '',
          },
        })
      } else {
        return Promise.resolve(null)
      }
    })

    return Promise.all(promises)
  }

  renderElement({ context, store }) {
    const element = React.createElement(AppServer, {
      context,
      store,
      location: this.req.url,
    })

    return ReactDOMServer.renderToString(element)
  }
}
