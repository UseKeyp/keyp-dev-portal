/** @returns {import('webpack').Configuration} Webpack Configuration */
module.exports = (config, { mode }) => {
  if (mode === 'development') {
    // Add dev plugin
  }

  // Add custom rules for your project
  // config.module.rules.push(YOUR_RULE)

  config.module.rules.push({
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    options: {
      presets: [
        '@babel/preset-env',
        ['@babel/preset-react', { runtime: 'automatic' }],
      ],
    },
    resolve: {
      fullySpecified: false,
    },
  })

  // Add custom plugins for your project
  // config.plugins.push(YOUR_PLUGIN)

  return config
}
