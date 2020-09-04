module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    proxy: {
      '/': {
        "target": 'http://ec2-3-20-222-199.us-east-2.compute.amazonaws.com:9010/',
        "pathRewrite": { '^/': '' },
        "changeOrigin": true,
        "secure": false
      }
    }
  }
}
