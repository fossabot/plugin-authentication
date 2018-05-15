const account = require('./src/js/account')
const login = require('./src/js/login')
const writePage = require('./src/js/writePage')

const processAccount = function (block) {
  return account.init(block, this.book)
}

const processLogin = function (block) {
  const log = this.book.log

  log.error(this)

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
  hooks: {
    'finish:before': function () {
      const log = this.book.log
      log.info('generate page login\n')

      const content = {
        title: 'Login',
        body: [
          '<h1>Login</h1>',
          login.init(this.book)
        ].join('\n')
      }

      writePage(this.output, 'login.html', content)

      log.debug('login successfully generated\n')
    }
  },
  filters: {
    date: function (str) {
      return (new Date(str)).toDateString()
    },
    toURL: function (path) {
      return `/${this.output.toURL(path)}`
    }
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
