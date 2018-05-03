const _ = require('lodash')
const fs = require('fs')
const path = require('path')

module.exports = {
  init: (block, book) => {
    const providers = [
      {
        name: 'github',
        text: 'Log in with Github',
        url: 'https://blockchainworkbench.com/api/auth/github'
      },
      {
        name: 'google',
        text: 'Log in with Google',
        url: 'https://blockchainworkbench.com/api/auth/google'
      }
    ]

    return providers.map((provider) => {
      let tpl = _.template(fs.readFileSync(path.resolve(__dirname, '../template/login_button.html')))
      return tpl({ provider: provider })
    }).join('\n')
  }
}
