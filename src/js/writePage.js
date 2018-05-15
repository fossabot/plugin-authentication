const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

/**
 * Create a new html page with the gitbook template
 * @param {Object} output - Gitbook standard output
 * @param {string} filePath - Relative path in the output folder
 * @param {{title: string, body: string}} content - Description of the new page
 */
const writePage = (output, filePath, content) => {
  // index.html is always generated and is the base model for all other pages
  const index = fs.readFileSync(path.resolve(output.root(), 'index.html'), 'utf8')
  const dom = new JSDOM(index)

  dom.window.document.title = content.title

  // newly created page doesn't have navigation, otherwise add it in the summary
  dom.window.document.querySelector('link[rel*="next"]').remove()
  dom.window.document.querySelector('.navigation.navigation-next.navigation-unique').remove()

  // for the same reasons, it doesn't appear as active in the navigation sidebar
  dom.window.document.querySelector('.chapter.active').className =
    dom.window.document.querySelector('.chapter.active').className.replace(/\sactive/, '')

  dom.window.document.querySelector('.normal.markdown-section').innerHTML = content.body

  filePath = path.join(output.root(), 'login.html')

  fs.writeFileSync(filePath, dom.serialize())
}

module.exports = writePage
