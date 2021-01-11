// vue.config.js
module.exports = {
    chainWebpack: config => {
      config.module
        .rule('css')
          .test(/\.css$/)
          .oneOf('vue')
          .resourceQuery(/\?vue/)
          .use('px2rem')
            .loader('px2rem-loader')
            .options({
              remUnit: 37//设计稿的宽度的1/10
            })
    }
  }