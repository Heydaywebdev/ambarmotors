const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = express()

global.config = require('../nuxt.config.js')
global.env = process.env.NODE_ENV || 'production'

async function start() {
  const nuxt = new Nuxt(global.config)

  const { host, port } = nuxt.options.server
  if (global.env === 'development' || global.env === 'staging') {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port} for ENV:${global.env}`,
    badge: true
  })
}

start()
