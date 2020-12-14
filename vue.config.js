const path = require('path')
module.exports = {
/*  configureWebpack: {
    target: 'electron-renderer',
    node: {
      __dirname: false,
    },
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: 'node-loader',
        },
      ],
    }, 
  }, */
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: "native-ext-loader",
          options: {
            rewritePath: path.resolve(__dirname, "native")
          }
        }
       ]
    }
  },

	/*
  chainWebpack: config => {
    config.module  
	.rule('node')
        .test(/\.node$/)
        .use('node-loader')
          .loader('node-loader')
          .end()
 }, */
 pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
    }
  },
}

