const getToken = require('vidus-node')
const configs = require('./config.js')

module.exports = () => {
  const user = {}

  user.token = (username) => {
    return getToken(configs.vidus.app_id, configs.vidus.app_secret, username)
  }

  return user
}