require('@babel/register')({
  extensions: ['.js', '.jsx'],
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-throw-expressions',
  ],
})
require('@babel/polyfill')
require('isomorphic-fetch')

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000
const app = express()
const SSR = require('./SSR').default

app.set('views', path.join(__dirname, '../server'))
app.set('view engine', 'ejs')
app.use('/assets', express.static(path.join(__dirname, '../../build'), {
  index: false,
  fallthrough: false,
  maxage: 1000 * 60 * 60 * 24 * 7,
}))

app.use('/', (req, res) => {
  try {
    const ssr = new SSR(req, res)
    ssr.render(req, res)
  } catch (error) {
    console.error(error)
    res.status(500).send('Something broke!')
  }
})

app.use((err, req, res, next) => {
  console.error(err.stack)

  if (res.headersSent) {
    return next(err)
  }

  return res.status(err.status || 500).send('Something broke!')
})

app.listen(port, () => {
  console.info(`[server] Server is listening on port ${port}... 👍`)
})

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at: Promise', p, 'reason:', reason)
})
