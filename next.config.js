module.exports = {
  async rewrites() {
    return [
      {
        // Route all requests with a path of py-api to the flask server
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5328/:path*', // Proxy to Backend
      },
    ]
  },
}