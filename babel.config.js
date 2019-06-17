module.exports = function (api) {
  const mode = process.env.NODE_ENV
  api.cache.forever()

  const presets = [
    ['@babel/preset-env', { 'modules': false }],
    '@babel/preset-react',
  ]

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-throw-expressions',
    ['@babel/plugin-transform-runtime', { 'regenerator': true }],
  ]

  if (mode === 'development') {
    plugins.concat([
      'react-hot-loader/babel',
      'transform-react-remove-prop-types',
    ])
  }

  return {
    presets,
    plugins,
  }
}
