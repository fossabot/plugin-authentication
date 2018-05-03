const account = require('./src/js/account')
const login = require('./src/js/login')

const processAccount = function (block) {
  return account.init(block, this.book)
}

const processLogin = function (block) {
  return login.init(block, this.book)
}

module.exports = {
  book: {
    assets: './assets',
    js: [
      'buttons.js'
    ],
    css: [
      'buttons.css'
    ]
  },
  blocks: {
    login: {
      parse: false,
      process: processLogin
    },
    account: {
      parse: false,
      process: processAccount
    }
  }
}
