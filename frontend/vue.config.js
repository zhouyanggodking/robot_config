module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'https://inews.shannonai.com/'
        // target: 'https://inews.shannonai.com'
      }
    }
  }
};
