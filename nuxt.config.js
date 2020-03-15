import axios from 'axios';

export default {

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '怀南会',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    bodyAttrs: {
      class: 'body-class',
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/css/index.css',
    'swiper/dist/css/swiper.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '@/assets/js/iconfont.js', ssr: false },
    {src:'@/plugins/vue-swiper', ssr:false },
    {src:'@/plugins/flexible.js', ssr:false },
    '@/plugins/vant.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  // modules: [
  // ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true,
    // credentials: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/api': { target:'http://test.huainanhui.com/', pathRewrite:{'^/api/': ''}}, //https://www.huainanhui.com   http://nt259brqzw.52http.tech/
    '/ppi': { target:'http://tapp.huainanhui.com/', pathRewrite:{'^/ppi/': ''}}
  },
  // '/images': {
  //   target: 'https://mangadrawer.com/',
  //   pathRewrite: {
  //     '^/images': 'images',
  //     changeOrigin: true
  //   }
  // },

  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    postcss: {
      plugins: {
        'postcss-pxtorem': {
          rootValue: 37.5,
          propList: ['*'],
          selectorBlackList: ['mint-']
        }
      }
    },
    extend (config, ctx) {
    }
  }
}
