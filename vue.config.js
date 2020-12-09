const path = require('path')
function resolve(dir) { 
  return path.join(__dirname,dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns:[path.resolve(__dirname,'./src/assets/css/base.less')]
    }
  }
}