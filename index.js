const menubar = require('menubar')
const ipc = require('ipc')
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')

const mb = menubar()

const radiusUrl = 'http://fundingcircle.github.io/radius/section-colors.html'

mb.on('after-create-window', () => {
  //mb.window.openDevTools()
	getContent()

  ipc.on('update-colors', (arg) => {
    getContent()
  })

  ipc.on('quit', arg => {
    mb.app.quit();
  })
})

function getContent() {
  let colorCats = []
  let colors = []

  request(radiusUrl, (err, res, body) => { if (err) {
      console.log('Error: %s', err)
      return
    }

    var $ = cheerio.load(body)
    colorCats = $('.sg-title div').text()


    $('.component').each((ind, el) => {
      var color = {
        rgb: '',
        hex: '',
        func: '',
        name: '',
        className: ''
      }

      color.func = $(el).find('.component__description code').text()
      color.name = $(el).find('.component__name').text().replace(/^\.color-/, '')
      color.className = $(el).find('.component__name').text().replace(/^\./, '')

      colors.push(color)
    })

    setTimeout(function () {
      mb.window.webContents.send('update-elements', colors)
    }, 500)
	})
}


