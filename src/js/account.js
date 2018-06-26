const _ = require('lodash')
const fs = require('fs')
const path = require('path')

module.exports = {
  init: (book) => {
    const form = {
      url: 'https://achievement.network/api/users/',
      method: 'post'
    }

    const fields = [
      {
        name: 'Email',
        type: 'email',
        placeholder: 'example@example.com',
        readonly: true,
        required: true
      },
      {
        name: 'Public Key',
        type: 'publicKey',
        placeholder: '0x'.padEnd(40, '0'),
        pattern: '0x[0-9a-fA-F]{40}',
        required: true
      }
    ]

    let tpl = _.template(fs.readFileSync(path.resolve(__dirname, '../template/account.html')))
    return tpl({
      title: 'My Account',
      form: form,
      fields: fields
    })
  }
}
