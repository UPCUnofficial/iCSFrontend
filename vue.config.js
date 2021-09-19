module.exports = {
  transpileDependencies: [
    'vuetify'
  ],publicPath:'./',productionSourceMap:false,
  chainWebpack: config => {

      var externals = {
        'vue': 'Vue',
        'vuetify': 'Vuetify',
        'xlsx':'XLSX'


      }
      config.externals(externals)
    }
}
