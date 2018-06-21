const account = require('./src/js/account')
const login = require('./src/js/login')
const writePage = require('./src/js/writePage')

const processAccount = function () {
  const log = this.book.log
  log.info('generate page account\n')

  const content = {
    title: 'My Account',
    body: account.init()
  }

  writePage(this.output, 'account.html', content)

  log.debug('account successfully generated\n')
}

const processLogin = function () {
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

      processLogin.apply(this)
      processAccount.apply(this)
    }
  },
  filters: {
    date: function (str) {
      return (new Date(str)).toDateString()
    },
    toURL: function (path) {
      return `/${this.output.toURL(path)}`
    }
  }
}
