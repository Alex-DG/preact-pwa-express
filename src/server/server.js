import app from './app'
require('source-map-support').install()

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('----------------------------------------------------d-_-b');
  console.log(`[server] app on http://localhost:${server.address().port} - ${app.settings.env}`)
  console.log('----------------------------------------------------d-_-b');
})

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0)
  })
})
