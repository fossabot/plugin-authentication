/* global web3, XMLHttpRequest */

require(['gitbook'], (gitbook) => {
  const postPublicKey = () => {
    return new Promise((resolve, reject) => {
      const url = `https://blockchainworkbench.com/api/users`
      const xhr = new XMLHttpRequest()
      xhr.open('POST', url, true)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          try {
            let user = JSON.parse(xhr.responseText)
            resolve(user)
          } catch (err) {
            resolve(undefined)
          }
        }
      }
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(`publicKey=${web3.eth.accounts[0]}`)
    })
  }

  const getUser = () => {
    const url = `https://blockchainworkbench.com/api/users`
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          try {
            let user = JSON.parse(xhr.responseText)
            if (user.publicKey === web3.eth.accounts[0]) {
              resolve(user)
              return
            }
            postPublicKey().then(r => {
              resolve(r)
            })
          } catch (err) {
            resolve(undefined)
          }
        }
      }
      xhr.open('GET', url, true)
      xhr.send(null)
    })
  }

  window.user = getUser()

  gitbook.events.bind('start', (e, config) => {
    gitbook.toolbar.createButton({
      icon: 'fa fa-sign-in',
      text: 'Sign-In',
      position: 'right',
      onClick: (e) => {
        e.preventDefault()
        window.location = 'https://blockchainworkbench.com/login'
      },
      id: 'sign-in-button'
    })
  })

  window.user.then((user) => {
    if (user === undefined) {
      return
    }
    gitbook.toolbar.removeButton('sign-in-button')
    gitbook.toolbar.createButton({
      icon: 'fa fa-user',
      text: `${user.publicKey.substring(0, 6)}...${user.publicKey.slice(-4)}`,
      position: 'right',
      onClick: (e) => {
        e.preventDefault()
        window.location = 'https://blockchainworkbench.com/api/logout'
      }
    })
  })
})
