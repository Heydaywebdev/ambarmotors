const config = require('../../nuxt.config.js')

const stage = process.env.NODE_ENV || 'production'

const env = config.env[stage]

const sharedEnv = {
  baseUrl: env.baseUrl,
  inventoryUrl: env.inventoryUrl,
  cdnUrl: env.cdnUrl,
  apiUrl: env.apiUrl,
  ezlead_key: env.ezlead_key
}

export default sharedEnv
export const getEnv = (env) => config.env[env];
